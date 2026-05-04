import api from './api.js';

const ENROLLMENT_KEY = 'lms_enrollments';

export const getStoredEnrollmentIds = () => {
  try {
    return JSON.parse(localStorage.getItem(ENROLLMENT_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

export const setStoredEnrollmentIds = (ids) => {
  localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(ids));
};

export const enrollCourse = async (courseId) => {
  try {
    const { data } = await api.post('/enroll', { courseId });
    return { ...data, offline: false };
  } catch (error) {
    const stored = getStoredEnrollmentIds();
    if (!stored.includes(courseId)) {
      setStoredEnrollmentIds([...stored, courseId]);
    }
    return { offline: true };
  }
};

export const getMyCourses = async () => {
  const { data } = await api.get('/my-courses');
  return data;
};

export const buildLocalEnrollments = (courses = []) => {
  const stored = getStoredEnrollmentIds();
  return stored
    .map((courseId) => {
      const course = courses.find((item) => item._id === courseId);
      if (!course) {
        return null;
      }
      return {
        _id: `local-${courseId}`,
        course,
        progress: 0,
      };
    })
    .filter(Boolean);
};
