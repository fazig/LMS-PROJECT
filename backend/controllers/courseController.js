const Course = require('../models/Course');

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email role');
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required.' });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (req.user.role === 'instructor' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course.' });
    }

    const { title, description, category, price } = req.body;

    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.category = category ?? course.category;
    if (price !== undefined) {
      course.price = price;
    }

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (req.user.role === 'instructor' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course.' });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
