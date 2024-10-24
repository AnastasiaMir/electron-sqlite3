const sqlite3 = require('sqlite3');

const users = [
  {
    name: 'Anastasia',
    email: 'aaa@mail.ru',
  },
  {
    name: 'Vladimir',
    email: 'vvv@mail.ru',
  },
  {
    name: 'Fedor',
    email: 'fff@mail.ru',
  },
];

const sqlite = sqlite3.verbose();

const db = new sqlite.Database('./db.sqlite3');
db.serialize(() => {
  db.run(`create table IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT)`);
  const addData = db.prepare('insert into users (NAME, EMAIL) Values (?, ?)');
  for ({name, email} of users) {
    addData.run(name, email)
  }
  addData.finalize();
});
// db.close()

const getUsers = (callback) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

const addUser = (name, email, callback) => {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');

  stmt.run(name, email, (err) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID });
    }
  });

  stmt.finalize();
};

module.exports = { getUsers, addUser };
