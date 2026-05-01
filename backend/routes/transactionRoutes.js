const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

router.post('/issue-book', requireAuth, transactionController.issueBook);
router.get('/transactions', requireAdmin, transactionController.getTransactions);
router.post('/return-book', requireAdmin, transactionController.returnBook);
router.post('/resolve-fine', requireAdmin, transactionController.resolveFine);
router.post('/return-book-student', requireAuth, transactionController.returnBookStudent);

module.exports = router;
