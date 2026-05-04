const express = require('express');
const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', getCourses);
router.post('/', authMiddleware, authorizeRoles('admin', 'instructor'), createCourse);
router.put('/:id', authMiddleware, authorizeRoles('admin', 'instructor'), updateCourse);
router.delete('/:id', authMiddleware, authorizeRoles('admin', 'instructor'), deleteCourse);

module.exports = router;
