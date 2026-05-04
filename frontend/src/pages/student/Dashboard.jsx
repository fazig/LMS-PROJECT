import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getCourses } from '../../services/courseService.js';
import { buildLocalEnrollments, getMyCourses } from '../../services/enrollmentService.js';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('my-courses');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const results = await Promise.allSettled([getMyCourses(), getCourses()]);
        const enrollmentResult = results[0];
        const courseResult = results[1];
        const courseData = courseResult.status === 'fulfilled' ? courseResult.value : [];
        const enrollmentData =
          enrollmentResult.status === 'fulfilled'
            ? enrollmentResult.value
            : buildLocalEnrollments(courseData);
        setEnrollments(enrollmentData);
        setCourses(courseData);
      } catch (error) {
        const fallbackCourses = await getCourses().catch(() => []);
        setCourses(fallbackCourses);
        setEnrollments(buildLocalEnrollments(fallbackCourses));
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  const enrolledIds = useMemo(
    () => new Set(enrollments.map((enrollment) => enrollment.course?._id).filter(Boolean)),
    [enrollments]
  );
  const browseCourses = courses.filter((course) => !enrolledIds.has(course._id));
  const progressAverage =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((total, enrollment) => total + (enrollment.progress || 0), 0) /
            enrollments.length
        )
      : 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <div className="dashboard-v2-shell">
        <div className="dashboard-v2-header">
          <div className="header-text">
            <span className="hero-pill subtle" style={{ marginBottom: '0.5rem' }}>Student Dashboard</span>
            <h2 className="section-title" style={{ margin: 0, color: '#0f172a' }}>
              Welcome back, {user?.name || 'Learner'} 👋
            </h2>
            <p className="subtle" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
              Keep your progress steady and explore new tracks curated for your goals.
            </p>
          </div>
          <div className="dashboard-v2-stats">
            <div className="stat-bento">
              <span className="stat-value">{enrollments.length}</span>
              <span className="stat-label">Active courses</span>
            </div>
            <div className="stat-bento primary">
              <span className="stat-value">{progressAverage}%</span>
              <span className="stat-label">Avg progress</span>
            </div>
            <div className="stat-bento">
              <span className="stat-value">{browseCourses.length}</span>
              <span className="stat-label">Available courses</span>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          {[
            { id: 'my-courses', label: 'My Courses' },
            { id: 'browse', label: 'Browse Courses' },
            { id: 'profile', label: 'Profile & Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dashboard-v2-content">
          {activeTab === 'my-courses' && (
            <div className="dashboard-panel-v2">
              <div className="panel-header-v2">
                <h3 className="section-title" style={{ fontSize: '1.5rem' }}>My Courses</h3>
                <span className="subtle">Continue where you left off</span>
              </div>
              <div className="dashboard-course-list">
                {enrollments.map((enrollment) => (
                  <div className="course-card-v2 course-wide-v2" key={enrollment._id}>
                    <div className="course-media-v2">
                      <img
                        src={
                          enrollment.course?.thumbnail ||
                          'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
                        }
                        alt={enrollment.course?.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="course-info-v2">
                      <div className="course-header-v2">
                        <h3>{enrollment.course?.title}</h3>
                        <p className="subtle" style={{ margin: '0.5rem 0' }}>{enrollment.course?.description}</p>
                      </div>
                      <div className="course-progress-wrapper">
                        <div className="progress-labels">
                          <span className="subtle">{enrollment.course?.category}</span>
                          <span className="progress-text">{enrollment.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <span style={{ width: `${enrollment.progress}%` }}></span>
                        </div>
                      </div>
                      <div className="course-actions-v2">
                        <Link className="button-brilliant primary" to={`/courses/${enrollment.course?._id}`} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                          Continue learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                {!enrollments.length && (
                  <div className="empty-state-v2">
                    <div className="empty-icon">📚</div>
                    <h3>No courses yet</h3>
                    <p className="subtle">You haven't enrolled in any courses.</p>
                    <button className="button-brilliant primary" onClick={() => setActiveTab('browse')}>
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'browse' && (
            <div className="dashboard-panel-v2">
              <div className="panel-header-v2">
                <h3 className="section-title" style={{ fontSize: '1.5rem' }}>Browse other courses</h3>
                <span className="subtle">Hand-picked to keep you learning</span>
              </div>
              <div className="course-cards-grid">
                {browseCourses.map((course) => (
                  <div className="course-card-v2" key={course._id}>
                    <div className="course-media-v2">
                      <img src={course.thumbnail} alt={course.title} loading="lazy" />
                    </div>
                    <div className="course-info-v2">
                      <h3>{course.title}</h3>
                      <p className="subtle" style={{ margin: '0.5rem 0' }}>{course.description}</p>
                      <div className="course-meta-v2">
                        <span className="badge subtle">{course.category}</span>
                        <span className="price-tag">${course.price ?? 0}</span>
                      </div>
                      <div className="course-actions-v2">
                        <Link className="button-brilliant primary" to={`/courses/${course._id}`} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1, textAlign: 'center' }}>
                          View course
                        </Link>
                        <Link className="button-brilliant secondary" to="/courses" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                          See all
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {!browseCourses.length && (
                <div className="empty-state-v2">
                  <div className="empty-icon">🎯</div>
                  <h3>All caught up!</h3>
                  <p className="subtle">You are already enrolled in all available courses.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="dashboard-panel-v2">
              <div className="panel-header-v2">
                <h3 className="section-title" style={{ fontSize: '1.5rem' }}>Profile & Settings</h3>
                <span className="subtle">Your registration details are saved below.</span>
              </div>
              <div className="profile-grid-v2">
                <div className="profile-card-v2">
                  <h4>Account details</h4>
                  <div className="profile-field">
                    <label>Full name</label>
                    <input type="text" className="input-v2" value={user?.name || ''} readOnly />
                  </div>
                  <div className="profile-field">
                    <label>Email</label>
                    <input type="email" className="input-v2" value={user?.email || ''} readOnly />
                  </div>
                  <div className="profile-field">
                    <label>Role</label>
                    <input type="text" className="input-v2" value={user?.role || 'student'} readOnly />
                  </div>
                </div>
                <div className="profile-card-v2 highlight">
                  <h4>Learning settings</h4>
                  <ul className="settings-list">
                    <li>
                      <span className="icon">⏱️</span>
                      <div>
                        <strong>Weekly goal</strong>
                        <p className="subtle">4 lessons</p>
                      </div>
                    </li>
                    <li>
                      <span className="icon">🌙</span>
                      <div>
                        <strong>Preferred time</strong>
                        <p className="subtle">Evening sessions</p>
                      </div>
                    </li>
                    <li>
                      <span className="icon">🔔</span>
                      <div>
                        <strong>Notifications</strong>
                        <p className="subtle">Enabled</p>
                      </div>
                    </li>
                  </ul>
                  <button className="button-brilliant outline" style={{ marginTop: '1.5rem', width: '100%' }}>
                    Edit preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
