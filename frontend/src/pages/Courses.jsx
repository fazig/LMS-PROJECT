import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { getCourses } from '../services/courseService.js';
import { getStoredEnrollmentIds } from '../services/enrollmentService.js';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
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

    loadCourses();
  }, []);

  const categories = useMemo(() => {
    const values = courses.map((course) => course.category).filter(Boolean);
    return ['All', ...new Set(values)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (activeTab === 'All') {
      return courses;
    }
    return courses.filter((course) => course.category === activeTab);
  }, [courses, activeTab]);

  const enrolledIds = useMemo(() => new Set(getStoredEnrollmentIds()), [courses]);

  return (
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">All Courses</h2>
        <p className="subtle">Browse curated tracks and start learning today.</p>
      </div>
      <div className="tab-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${activeTab === category ? 'active' : ''}`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="course-list">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.has(course._id);
            return (
              <div className="card course-wide card-3d" key={course._id}>
                <div className="course-wide-media">
                  <img src={course.thumbnail} alt={course.title} loading="lazy" />
                </div>
                <div className="course-wide-content">
                  <div>
                    <h3>{course.title}</h3>
                    <p className="subtle">{course.description}</p>
                  </div>
                  <div className="course-wide-meta">
                    <span className="badge">{course.category}</span>
                    <span className="subtle">{course.playlistVideos?.length || 4} videos</span>
                    <span className="subtle">${course.price ?? 0}</span>
                    {isEnrolled && <span className="badge badge-emerald">Enrolled</span>}
                  </div>
                  <div className="course-wide-actions">
                    <Link
                      className={`button ${isEnrolled ? 'button-emerald' : 'button-primary'}`}
                      to={`/courses/${course._id}`}
                    >
                      {isEnrolled ? 'Go to course' : 'View Details'}
                    </Link>
                    {course.youtubeLink && (
                      <span className="subtle">Playlist included</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Courses;
