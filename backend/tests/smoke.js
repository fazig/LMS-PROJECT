const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

const token = generateToken('507f1f77bcf86cd799439011', 'student');
const decoded = jwt.verify(token, process.env.JWT_SECRET);

if (decoded.id !== '507f1f77bcf86cd799439011' || decoded.role !== 'student') {
  throw new Error('Token payload mismatch');
}

console.log('Smoke test passed.');
