const Book = require('../models/Book');
const Transaction = require('../models/Transaction');

exports.getDashboard = (req, res) => {
  if (req.session.user.role === 'admin') {
    Book.getStats((err, results) => {
      res.render('dashboard', { stats: results[0] });
    });
  } else {
    Transaction.getMyBooks(req.session.user.id, (err, myBooks) => {
      res.render('dashboard', { myBooks });
    });
  }
};

exports.getBooks = (req, res) => {
  const queryParam = req.query.q || '';
  
  Book.search(queryParam, (err, books) => {
    Book.getAuthors((err, authors) => {
      Book.getCategories((err, categories) => {
        res.render('books', { books, authors, categories, searchQuery: queryParam });
      });
    });
  });
};

exports.addBook = (req, res) => {
  const { title, author_name, category_id, isbn, copies } = req.body;
  Book.getOrCreateAuthor(author_name, (err, author_id) => {
    if (err) {
      console.error(err);
      return res.redirect('/books?notif=Error adding author&notif_type=error');
    }
    Book.add(title, author_id, category_id, isbn, copies, (err) => {
      if (err) console.error(err);
      res.redirect('/books?notif=Book added successfully');
    });
  });
};

exports.editBook = (req, res) => {
  const { id, title, author_name, category_id, isbn, copies } = req.body;
  Book.getOrCreateAuthor(author_name, (err, author_id) => {
    if (err) {
      console.error(err);
      return res.redirect('/books?notif=Error updating author&notif_type=error');
    }
    Book.update(id, title, author_id, category_id, isbn, copies, (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/books?notif=Error updating book&notif_type=error');
      }
      res.redirect('/books?notif=Book updated successfully');
    });
  });
};

exports.deleteBook = (req, res) => {
  const { id } = req.body;
  Book.delete(id, (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/books?notif=' + encodeURIComponent(err.message) + '&notif_type=error');
    }
    res.redirect('/books?notif=Book deleted successfully');
  });
};
