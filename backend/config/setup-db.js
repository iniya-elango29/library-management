const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library_db',
  multipleStatements: true
});

const setupDatabase = async () => {
  console.log("Connecting to database...");

  const adminHash = await bcrypt.hash('admin123', 10);
  const studentHash = await bcrypt.hash('student123', 10);

  const sql = `
    DROP TABLE IF EXISTS transactions;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS authors;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      email VARCHAR(100),
      role ENUM('admin', 'student') DEFAULT 'student',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE authors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );

    CREATE TABLE books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author_id INT,
      category_id INT,
      isbn VARCHAR(20) UNIQUE,
      copies_total INT DEFAULT 1,
      copies_available INT DEFAULT 1,
      FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );

    CREATE TABLE transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      book_id INT NOT NULL,
      issue_date DATE NOT NULL,
      due_date DATE NOT NULL,
      return_date DATE,
      fine_amount DECIMAL(10,2) DEFAULT 0.00,
      status ENUM('issued', 'returned', 'reserved') DEFAULT 'issued',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    );

    INSERT INTO users (username, password_hash, email, role) VALUES 
      ('admin', '${adminHash}', 'admin@library.com', 'admin'),
      ('student', '${studentHash}', 'student@library.com', 'student');

    INSERT INTO categories (name) VALUES 
      ('Fiction'), ('Science Fiction'), ('Programming'), ('History');

    INSERT INTO authors (name) VALUES 
      ('F. Scott Fitzgerald'), ('Isaac Asimov'), ('Robert C. Martin'), ('Yuval Noah Harari');

    INSERT INTO books (title, author_id, category_id, isbn, copies_total, copies_available) VALUES 
      ('The Great Gatsby', 1, 1, '9780743273565', 5, 5),
      ('Foundation', 2, 2, '9780553293357', 3, 3),
      ('Clean Code', 3, 3, '9780132350884', 2, 2),
      ('Sapiens', 4, 4, '9780062316097', 4, 4);
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error setting up database:", err);
    } else {
      console.log("Database schema created and populated successfully!");
    }
    db.end();
  });
};

db.connect(err => {
  if (err) throw err;
  setupDatabase();
});
