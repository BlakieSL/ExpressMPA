const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const actionRoutes = require('./route/actions');

const app = express();
app.listen(3000, () => {
  console.log('Server started (http://localhost:3000/actions/)!');
});

const db = new sqlite3.Database('./chinook.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('DB connected');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    username TEST NOT NULL,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    birthday TEXT NOT NULL
  )`);


  /*
  db.run(`INSERT INTO user (email, username, name, surname, birthday) VALUES
    ('testmail@gmail.com', 'generatedUsername1', 'TesterName1', 'TesterSurname1', '1990-05-10'),
    ('martingflowler', 'generatedUsername2', 'Martin', 'Flowler', '1991-01-09'
  )`);
   */
});

app.set('db', db);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/actions', actionRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'allUsers.html'));
});