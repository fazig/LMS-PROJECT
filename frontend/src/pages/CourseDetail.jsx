import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { getCourseById } from '../services/courseService.js';
import { enrollCourse } from '../services/enrollmentService.js';
import { useAuth } from '../context/AuthContext.jsx';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const enrollmentKey = 'lms_enrollments';

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        setActiveIndex(0);
      } catch (error) {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(enrollmentKey) || '[]');
    const isEnrolled = stored.includes(id);
    setEnrolled(isEnrolled);
    if (isEnrolled) {
      setTimeout(() => {
        const section = document.getElementById('playlist');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [id]);

  const handleEnroll = async () => {
    try {
      const result = await enrollCourse(id);
      setMessage(result?.offline ? 'Enrolled locally. Connect server to sync.' : 'Enrollment successful!');
      setEnrolled(true);
      const stored = JSON.parse(localStorage.getItem(enrollmentKey) || '[]');
      if (!stored.includes(id)) {
        localStorage.setItem(enrollmentKey, JSON.stringify([...stored, id]));
      }
    } catch (error) {
      const errorMessage = error.message || 'Unable to enroll.';
      setMessage(errorMessage);
      if (errorMessage.toLowerCase().includes('already enrolled')) {
        setEnrolled(true);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!course) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="section-title">Course not found</h2>
        </div>
      </div>
    );
  }

  const playlistVideos = course.playlistVideos || [];
  const activeVideo = playlistVideos[activeIndex] || playlistVideos[0];
  const getVideoDescription = (video, index) =>
    video?.description || `Lesson ${index + 1} in ${course.title}`;
  const activeEmbedUrl = activeVideo?.embedUrl
    ? `${activeVideo.embedUrl}&autoplay=1&rel=0`
    : '';

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, playlistVideos.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="container">
      {!enrolled && (
        <div className="card detail-card">
          {course.thumbnail && (
            <div className="detail-thumb">
              <img src={course.thumbnail} alt={course.title} loading="lazy" />
            </div>
          )}
          <div className="detail-content">
            <h2 className="section-title">{course.title}</h2>
            <p className="subtle">{course.description}</p>
            <div className="course-meta detail-meta">
              <span className="badge">{course.category}</span>
              <span className="subtle">${course.price ?? 0}</span>
            </div>
            <div className="inline-actions">
              {user?.role === 'student' && !enrolled && (
                <button className="button button-primary" onClick={handleEnroll}>
                  Enroll now
                </button>
              )}
              {!user && <span className="subtle">Login as student to enroll.</span>}
            </div>
            {message && <p className="subtle" style={{ marginTop: '1rem' }}>{message}</p>}
          </div>
        </div>
      )}

      <section className="section" id="playlist" style={{ marginTop: enrolled ? '2rem' : '0' }}>
        <div className="section-header">
          <h3 className="section-title">Playlist</h3>
          <span className="subtle">{course.playlistVideos?.length || 0} lessons</span>
        </div>
        <div className="card playlist-card">
          <div className="playlist-layout">
            <aside className="playlist-sidebar">
              <div className="playlist-sidebar-header">
                <h4>Course content</h4>
                <span className="subtle">{playlistVideos.length} lessons</span>
              </div>
              <ul className="playlist-list">
                {playlistVideos.map((video, index) => (
                  <li
                    key={`${video.title}-${index}`}
                    className={`playlist-item ${index === activeIndex ? 'active' : ''} ${
                      enrolled ? '' : 'locked'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      disabled={!enrolled}
                    >
                      <span className="playlist-index">{index + 1}</span>
                      <span>
                        <strong>{video.title}</strong>
                        <small className="subtle">{getVideoDescription(video, index)}</small>
                      </span>
                      <span className="subtle">{video.duration}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="playlist-player">
              {enrolled && activeVideo ? (
                <>
                  <div className="playlist-player-frame">
                    <iframe
                      key={activeEmbedUrl}
                      src={activeEmbedUrl}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="playlist-player-meta">
                    <div>
                      <h4>{activeVideo.title}</h4>
                      <p className="subtle">{getVideoDescription(activeVideo, activeIndex)}</p>
                      {activeVideo.embedUrl && (
                        <div style={{ marginTop: '0.5rem', wordBreak: 'break-all' }}>
                          <span className="subtle">Video URL: </span>
                          <a href={activeVideo.embedUrl} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                            {activeVideo.embedUrl}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="playlist-player-actions">
                      <button
                        className="button button-secondary"
                        onClick={handlePrev}
                        type="button"
                        disabled={activeIndex === 0}
                      >
                        Previous
                      </button>
                      <button
                        className="button button-emerald"
                        onClick={handleNext}
                        type="button"
                        disabled={activeIndex >= playlistVideos.length - 1}
                      >
                        Next lesson
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="playlist-locked">
                  <p className="subtle">Enroll to unlock the full playlist and watch lessons here.</p>
                  {user?.role === 'student' && (
                    <button className="button button-primary" onClick={handleEnroll}>
                      Enroll to Start
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
