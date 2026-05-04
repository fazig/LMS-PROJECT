const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, authorizeRoles('admin'), getAllUsers);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteUser);

module.exports = router;
