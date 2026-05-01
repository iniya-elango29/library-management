const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

exports.issueBook = (req, res) => {
  const { book_id, borrow_days } = req.body;
  const user_id = req.session.user.id;
  
  const days = parseInt(borrow_days) || 14;
  const validDays = Math.max(1, Math.min(10, days));
  
  Book.checkAvailability(book_id, (err, results) => {
    if (results.length > 0 && results[0].copies_available > 0) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + validDays);
      
      Transaction.issueBook(user_id, book_id, dueDate, (err) => {
        if (!err) {
          Book.decrementAvailability(book_id, () => {
            res.redirect('/dashboard');
          });
        }
      });
    } else {
      res.send("Book not available");
    }
  });
};

exports.getTransactions = (req, res) => {
  Transaction.getAll((err, transactions) => {
    res.render('transactions', { transactions });
  });
};

exports.returnBook = (req, res) => {
  const { transaction_id, book_id } = req.body;
  Transaction.returnBook(transaction_id, (err) => {
    if (!err) {
      Book.incrementAvailability(book_id, () => {
        res.redirect('/transactions');
      });
    } else {
      res.send("Error returning book");
    }
  });
};

exports.returnBookStudent = (req, res) => {
  const { transaction_id, book_id } = req.body;
  Transaction.returnBook(transaction_id, (err) => {
    if (!err) {
      Book.incrementAvailability(book_id, () => {
        res.redirect('/dashboard');
      });
    } else {
      res.send("Error returning book");
    }
  });
};

exports.resolveFine = (req, res) => {
  const { transaction_id } = req.body;
  Transaction.resolveFine(transaction_id, (err) => {
    if (err) return res.redirect('/transactions?notif=Error resolving fine&notif_type=error');
    res.redirect('/transactions?notif=Fine resolved successfully');
  });
};
