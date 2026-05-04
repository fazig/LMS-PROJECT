import { useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { getMyCourses } from '../services/enrollmentService.js';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const data = await getMyCourses();
        setEnrollments(data);
      } catch (error) {
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h2 className="section-title">My Courses</h2>
      <div className="grid grid-3">
        {enrollments.map((enrollment) => (
          <div className="card" key={enrollment._id}>
            <h3>{enrollment.course?.title}</h3>
            <p className="subtle">{enrollment.course?.description}</p>
            <div className="course-meta detail-meta">
              <span className="badge">Progress {enrollment.progress}%</span>
            </div>
          </div>
        ))}
      </div>
      {!enrollments.length && <p className="subtle">You are not enrolled in any courses yet.</p>}
    </div>
  );
};

export default StudentDashboard;
