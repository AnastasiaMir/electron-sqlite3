const { contextBridge, ipcRenderer } = require('electron/renderer');
const { app, BrowserWindow } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('myAPI', {
  getDataFromDB: () => ipcRenderer.invoke('getDataFromDB'),
  openForm: () => ipcRenderer.invoke('openForm'),
  addUser: (user) => ipcRenderer.send('addUser', user),
  closeForm: () => ipcRenderer.send('closeForm'),
  sendMessageToMainWindow: (channel, data) => ipcRenderer.send(channel, data),
  receiveMessageFromForm: (channel, func) => {
    ipcRenderer.on(channel, (event, data) => func(data));
  }
});
