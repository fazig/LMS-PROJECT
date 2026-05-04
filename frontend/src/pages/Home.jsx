import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courseService.js';
import CourseCard from '../components/CourseCard.jsx';
import Loader from '../components/Loader.jsx';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.slice(0, 3));
      } catch (error) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <div className="home-v2">
      {/* ── Brilliant Hero Section ── */}
      <section className="hero-brilliant">
        <div className="hero-brilliant-bg">
          <div className="mesh-blob blob-1"></div>
          <div className="mesh-blob blob-2"></div>
          <div className="mesh-blob blob-3"></div>
        </div>
        
        <div className="container hero-brilliant-content">
          <span className="hero-pill">✨ The New Standard in Learning</span>
          <h1 className="hero-brilliant-title">
            Unlock your potential.<br />
            <span className="hero-gradient-text">Build the future.</span>
          </h1>
          <p className="hero-brilliant-subtitle">
            An ultra-modern learning management system designed to accelerate skill acquisition
            through immersive tracks, real-time analytics, and cinematic interfaces.
          </p>
          
          <div className="hero-brilliant-actions">
            <Link className="button-brilliant primary" to="/courses">
              Explore Courses
            </Link>
            <Link className="button-brilliant secondary" to="/register">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* ── Hunarmand Punjab Initiative ── */}
      <section className="hunarmand-section">
        <div className="container hunarmand-container">
          <div className="hunarmand-content">
            <span className="hero-pill subtle">Public Initiative</span>
            <h2 className="hunarmand-title">Hunarmand Punjab Initiative</h2>
            <div className="hunarmand-typing-wrapper">
              <span className="hunarmand-typing-text">Empowering Youth. Building the Future.</span>
            </div>
            <p className="hunarmand-description">
              We are proud to support the Hunarmand Punjab Initiative, a mission to equip the youth of Punjab with cutting-edge technical skills, fostering innovation, and driving economic growth through accessible, high-quality education.
            </p>
          </div>
          <div className="hunarmand-visual">
            <div className="hunarmand-badge">
              <div className="badge-inner">HP</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid Features ── */}
      <section className="section bento-section">
        <div className="container">
          <div className="section-header centered">
            <span className="hero-pill subtle">Platform Features</span>
            <h2 className="section-title">Everything you need to master new skills.</h2>
          </div>
          
          <div className="bento-grid">
            <div className="bento-card bento-large bento-gradient">
              <div className="bento-content">
                <h3>Structured Learning Paths</h3>
                <p>Follow expertly curated tracks that take you from absolute beginner to industry professional without the guesswork.</p>
              </div>
              <div className="bento-visual">
                <div className="path-line"></div>
                <div className="path-node active"></div>
                <div className="path-node"></div>
                <div className="path-node"></div>
              </div>
            </div>
            
            <div className="bento-card bento-glass">
              <div className="bento-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Track your completion rate, quiz scores, and learning velocity.</p>
            </div>
            
            <div className="bento-card bento-dark">
              <div className="bento-icon">🛡️</div>
              <h3>Role-based Access</h3>
              <p>Tailored views for students, instructors, and organization admins.</p>
            </div>
            
            <div className="bento-card bento-wide">
              <div className="bento-content">
                <h3>Live Cohorts & Community</h3>
                <p>Learn alongside peers. Join live sessions, submit projects for review, and grow together in a supportive environment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className="section featured-courses-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Courses</h2>
            <Link className="button-brilliant outline" to="/courses">
              View all courses →
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="course-cards-grid">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Infinite Marquee Testimonials ── */}
      <section className="marquee-section">
        <div className="section-header centered">
          <h2 className="section-title">Wall of Love</h2>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Double the array to create seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div className="marquee-group" key={i}>
                {[
                  { name: 'Sara M.', role: 'Frontend Developer', quote: 'The roadmap kept me focused, and the dashboards feel like a real premium product.' },
                  { name: 'Hassan R.', role: 'Data Scientist', quote: 'I loved the cohort experience. Everything is organized incredibly well.' },
                  { name: 'Zainab N.', role: 'UX Designer', quote: 'The analytics helped me stay accountable. Finished my course 2 weeks early!' },
                  { name: 'Ali K.', role: 'Software Engineer', quote: 'Finally an LMS that doesn\'t feel like it was built in 2010. Absolutely brilliant.' },
                ].map((review, j) => (
                  <div className="marquee-card" key={j}>
                    <div className="marquee-stars">⭐⭐⭐⭐⭐</div>
                    <p className="marquee-quote">"{review.quote}"</p>
                    <div className="marquee-author">
                      <div className="marquee-avatar">{review.name.charAt(0)}</div>
                      <div>
                        <strong>{review.name}</strong>
                        <span>{review.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section container">
        <div className="bottom-cta">
          <div className="bottom-cta-bg"></div>
          <div className="bottom-cta-content">
            <h2 className="bottom-cta-title">Ready to transform your career?</h2>
            <p>Join thousands of learners worldwide.</p>
            <Link className="button-brilliant primary large" to="/register">
              Create your free account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
