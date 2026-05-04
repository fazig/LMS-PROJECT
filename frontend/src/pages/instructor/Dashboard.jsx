import { useEffect, useMemo, useState } from 'react';
import Loader from '../../components/Loader.jsx';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../../services/courseService.js';
import { useAuth } from '../../context/AuthContext.jsx';

const defaultForm = {
  title: '',
  description: '',
  category: '',
  price: 0,
};

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const instructorId = user?.id || user?._id;

  const instructorCourses = useMemo(
    () => courses.filter((course) => course.instructor?._id === instructorId),
    [courses, instructorId]
  );

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await updateCourse(editingId, form);
        setMessage('Course updated successfully.');
      } else {
        await createCourse(form);
        setMessage('Course created successfully.');
      }
      setForm(defaultForm);
      setEditingId(null);
      await loadCourses();
    } catch (error) {
      setMessage(error.message || 'Action failed.');
    }
  };

  const startEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (error) {
      setMessage(error.message || 'Unable to delete course.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h2 className="section-title">Instructor Dashboard</h2>
      <div className="grid grid-2">
        <div className="card">
          <h3>{editingId ? 'Update Course' : 'Create Course'}</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Title
              <input className="input" name="title" value={form.title} onChange={handleChange} />
            </label>
            <label>
              Description
              <textarea
                className="input"
                rows="4"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Category
              <input className="input" name="category" value={form.category} onChange={handleChange} />
            </label>
            <label>
              Price
              <input
                className="input"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </label>
            {message && <p className="subtle">{message}</p>}
            <button className="button button-primary" type="submit">
              {editingId ? 'Update Course' : 'Create Course'}
            </button>
          </form>
        </div>
        <div>
          <h3 className="section-title">Your Courses</h3>
          <div className="grid">
            {instructorCourses.map((course) => (
              <div className="card" key={course._id}>
                <h4>{course.title}</h4>
                <p className="subtle">{course.description}</p>
                <div className="course-meta detail-meta">
                  <span className="badge">{course.category}</span>
                  <span className="subtle">${course.price ?? 0}</span>
                </div>
                <div className="inline-actions">
                  <button className="button button-secondary" onClick={() => startEdit(course)}>
                    Edit
                  </button>
                  <button className="button button-secondary" onClick={() => handleDelete(course._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!instructorCourses.length && <p className="subtle">No courses yet. Create your first course.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
