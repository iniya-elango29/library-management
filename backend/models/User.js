const db = require('../config/db');

class User {
  static findByUsernameAndRole(username, role, callback) {
    db.query('SELECT * FROM users WHERE username = ? AND role = ?', [username, role], callback);
  }

  static create(username, hash, callback) {
    db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hash], callback);
  }

  static getStudents(callback) {
    const sql = `
      SELECT u.id, u.username, u.email, u.created_at,
      (SELECT COUNT(*) FROM transactions WHERE user_id = u.id AND status = 'issued') as active_loans
      FROM users u
      WHERE u.role = 'student'
      ORDER BY u.created_at DESC
    `;
    db.query(sql, callback);
  }

  static deleteStudent(id, callback) {
    db.query('DELETE FROM users WHERE id = ? AND role = "student"', [id], callback);
  }
}

module.exports = User;
