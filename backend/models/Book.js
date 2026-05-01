const db = require('../config/db');

class Book {
  static getStats(callback) {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM books) as totalBooks,
        (SELECT COUNT(*) FROM users WHERE role = 'student') as totalStudents,
        (SELECT COUNT(*) FROM transactions WHERE status = 'issued') as activeLoans
    `;
    db.query(statsQuery, callback);
  }

  static search(queryParam, callback) {
    let sql = `
      SELECT b.*, a.name AS author_name, c.name AS category_name
      FROM books b
      LEFT JOIN authors a ON b.author_id = a.id
      LEFT JOIN categories c ON b.category_id = c.id
    `;
    
    let queryArgs = [];
    if (queryParam) {
      sql += ` WHERE b.title LIKE ? OR a.name LIKE ? OR b.isbn LIKE ?`;
      const searchLike = `%${queryParam}%`;
      queryArgs = [searchLike, searchLike, searchLike];
    }
    
    db.query(sql, queryArgs, callback);
  }

  static getAuthors(callback) {
    db.query('SELECT * FROM authors', callback);
  }

  static getCategories(callback) {
    db.query('SELECT * FROM categories', callback);
  }

  static add(title, author_id, category_id, isbn, copies, callback) {
    db.query(
      'INSERT INTO books (title, author_id, category_id, isbn, copies_total, copies_available) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author_id, category_id, isbn, copies, copies],
      callback
    );
  }

  static checkAvailability(book_id, callback) {
    db.query('SELECT copies_available FROM books WHERE id = ?', [book_id], callback);
  }

  static decrementAvailability(book_id, callback) {
    db.query('UPDATE books SET copies_available = copies_available - 1 WHERE id = ?', [book_id], callback);
  }

  static incrementAvailability(book_id, callback) {
    db.query('UPDATE books SET copies_available = copies_available + 1 WHERE id = ?', [book_id], callback);
  }

  static update(id, title, author_id, category_id, isbn, copies_total, callback) {
    db.query('SELECT copies_total FROM books WHERE id = ?', [id], (err, results) => {
      if (err || results.length === 0) return callback(err || new Error("Book not found"));
      const diff = copies_total - results[0].copies_total;
      
      db.query(
        'UPDATE books SET title = ?, author_id = ?, category_id = ?, isbn = ?, copies_total = ?, copies_available = copies_available + ? WHERE id = ?',
        [title, author_id, category_id, isbn, copies_total, diff, id],
        callback
      );
    });
  }

  static getOrCreateAuthor(author_name, callback) {
    db.query('SELECT id FROM authors WHERE name = ?', [author_name], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0) {
        callback(null, results[0].id);
      } else {
        db.query('INSERT INTO authors (name) VALUES (?)', [author_name], (err, result) => {
          if (err) return callback(err);
          callback(null, result.insertId);
        });
      }
    });
  }

  static delete(id, callback) {
    db.query('SELECT COUNT(*) as count FROM transactions WHERE book_id = ? AND status = "issued"', [id], (err, results) => {
      if (err) return callback(err);
      if (results[0].count > 0) {
        return callback(new Error("Cannot delete book: Currently issued to students."));
      }
      db.query('DELETE FROM books WHERE id = ?', [id], callback);
    });
  }
}

module.exports = Book;
