const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { getUsers, addUser } = require('./src/db');

ipcMain.handle('getDataFromDB', async (event) => {
  try {
    // Get data from your database
    const data = await new Promise((resolve, reject) => {
      getUsers((err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    return data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return { error: error.message };
  }
});
ipcMain.on('addUser', async (event, user) => {
  try {
    const { name, email } = user;
    const result = await new Promise((resolve, reject) => {
      addUser(name, email, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js'),
    },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();

  ipcMain.handle('openForm', (event, table) => {
    const newWin = new BrowserWindow({
      width: 800,
      height: 500,
      webPreferences: {
        preload: path.join(__dirname, 'src/preload.js'),
      },
    });

    newWin.loadFile('user.html');
    newWin.webContents.openDevTools();
    
    ipcMain.on('closeForm', () => {
      newWin.close();
    });
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(); // эта строка открывает окно на Маке, если у нашего приложения нет открытых окон, но мы его вызвали
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit(); // эта строка выключает приложение на винде и линуксе, если закрыты все его окна
});
