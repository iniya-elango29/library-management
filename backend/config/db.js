const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'melkie',
  database: 'library_db'
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to library_db");
});

module.exports = db;
