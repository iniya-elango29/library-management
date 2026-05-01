const db = require('../config/db');

class Transaction {
  static getMyBooks(userId, callback) {
    const myBooksQuery = `
      SELECT t.*, b.title, a.name as author 
      FROM transactions t
      JOIN books b ON t.book_id = b.id
      JOIN authors a ON b.author_id = a.id
      WHERE t.user_id = ? AND t.status = 'issued'
    `;
    db.query(myBooksQuery, [userId], callback);
  }

  static issueBook(userId, bookId, dueDate, callback) {
    db.query('INSERT INTO transactions (user_id, book_id, issue_date, due_date) VALUES (?, ?, CURDATE(), ?)', 
      [userId, bookId, dueDate], callback);
  }

  static getAll(callback) {
    const sql = `
      SELECT t.*, b.title, u.username
      FROM transactions t
      JOIN books b ON t.book_id = b.id
      JOIN users u ON t.user_id = u.id
      ORDER BY t.issue_date DESC
    `;
    db.query(sql, callback);
  }

  static returnBook(transactionId, callback) {
    db.query('UPDATE transactions SET return_date = CURDATE(), status = "returned" WHERE id = ?', [transactionId], callback);
  }

  static resolveFine(transactionId, callback) {
    db.query('UPDATE transactions SET fine_paid = TRUE WHERE id = ?', [transactionId], callback);
  }
}

module.exports = Transaction;
