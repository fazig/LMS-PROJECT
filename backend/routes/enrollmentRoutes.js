const express = require('express');
const { enrollCourse, getMyCourses } = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/enroll', authMiddleware, authorizeRoles('student'), enrollCourse);
router.get('/my-courses', authMiddleware, authorizeRoles('student'), getMyCourses);

module.exports = router;
