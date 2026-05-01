const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { requireAdmin } = require('../middleware/authMiddleware');

// Auth routes
router.get('/', authController.landing);
router.get('/login/admin', authController.loginAdmin);
router.get('/login/student', authController.loginStudent);
router.post('/login', authController.loginPost);
router.get('/register', authController.registerGet);
router.post('/register', authController.registerPost);
router.get('/logout', authController.logout);

// Student management routes
router.get('/students', requireAdmin, userController.getStudents);
router.post('/delete-student', requireAdmin, userController.deleteStudent);

module.exports = router;
