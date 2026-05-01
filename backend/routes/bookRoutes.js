const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', requireAuth, bookController.getDashboard);
router.get('/books', bookController.getBooks);
router.post('/add-book', requireAdmin, bookController.addBook);
router.post('/edit-book', requireAdmin, bookController.editBook);
router.post('/delete-book', requireAdmin, bookController.deleteBook);

module.exports = router;
