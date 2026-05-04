import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);
  const [counters, setCounters] = useState({ learners: 0, courses: 0, rate: 0, countries: 0 });
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    const targets = { learners: 12000, courses: 240, rate: 91, countries: 35 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounters({
        learners: Math.round(targets.learners * ease),
        courses: Math.round(targets.courses * ease),
        rate: Math.round(targets.rate * ease),
        countries: Math.round(targets.countries * ease),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [statsVisible]);

  const values = [
    {
      icon: '🎯',
      title: 'Mission-Driven',
      detail:
        'Every feature we build starts with a learner outcome in mind. We measure success by the skills our students gain.',
    },
    {
      icon: '🔬',
      title: 'Research-Backed',
      detail:
        'Our curriculum design follows spaced repetition, active recall, and project-based learning principles.',
    },
    {
      icon: '🤝',
      title: 'Community-First',
      detail:
        'Learning is social. We build cohorts, peer reviews, and mentorship into every track we offer.',
    },
    {
      icon: '⚡',
      title: 'Always Evolving',
      detail:
        'We ship updates weekly. New courses, better analytics, and smarter recommendations — non-stop.',
    },
  ];

  const milestones = [
    { year: '2023', event: 'Founded in Karachi with a 3-person team' },
    { year: '2023', event: 'Launched first 20 courses with 500 beta learners' },
    { year: '2024', event: 'Crossed 5,000 active learners and 100 courses' },
    { year: '2024', event: 'Introduced role-based dashboards for teams' },
    { year: '2025', event: 'Expanded to 35 countries with localized content' },
    { year: '2026', event: '12,000+ learners, 240+ courses, 91% completion rate' },
  ];

  const team = [
    {
      name: 'Muhammad Faizan',
      role: 'Founder & Platform Lead',
      bio: 'Full-stack architect passionate about EdTech. Built the core LMS engine from scratch.',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
    {
      name: 'Aisha Khan',
      role: 'Instructor Success Manager',
      bio: 'Former educator who bridges the gap between teaching expertise and platform tooling.',
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
    {
      name: 'Omar Siddiqui',
      role: 'Student Experience Coach',
      bio: 'UX specialist focused on reducing friction and maximizing learner engagement.',
      gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
    },
    {
      name: 'Sara Malik',
      role: 'Content Strategist',
      bio: 'Curates learning paths and ensures every module delivers measurable outcomes.',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
  ];

  return (
    <div className="about-page-v2">
      {/* ── Cinematic Hero ── */}
      <section className="about-hero-v2">
        <div className="about-hero-bg" />
        <div className="about-hero-content">
          <span className="badge badge-glow">About LMS Academy</span>
          <h1 className="about-hero-title">
            We don't just teach.<br />
            <span className="about-hero-accent">We engineer learning.</span>
          </h1>
          <p className="about-hero-subtitle">
            LMS Academy blends cinematic design, structured learning paths, and real-time
            analytics so students and teams can grow with clarity, speed, and confidence.
          </p>
          <div className="about-hero-actions">
            <Link className="button button-primary" to="/courses">
              Explore Courses
            </Link>
            <Link className="button button-secondary" to="/register">
              Join for Free
            </Link>
          </div>
        </div>
        <div className="about-hero-visual">
          <div className="about-orbit">
            <div className="about-orbit-ring" />
            <div className="about-orbit-ring about-orbit-ring-2" />
            <div className="about-orbit-center">
              <span>LMS</span>
            </div>
            <div className="about-orbit-dot about-orbit-dot-1">📚</div>
            <div className="about-orbit-dot about-orbit-dot-2">🎯</div>
            <div className="about-orbit-dot about-orbit-dot-3">🚀</div>
          </div>
        </div>
      </section>

      {/* ── Animated Stats ── */}
      <section className="about-stats-section" ref={statsRef}>
        <div className="container">
          <div className="about-stats-grid">
            {[
              { value: `${counters.learners.toLocaleString()}+`, label: 'Active Learners', icon: '👥' },
              { value: `${counters.courses}+`, label: 'Expert Courses', icon: '📖' },
              { value: `${counters.rate}%`, label: 'Completion Rate', icon: '🏆' },
              { value: `${counters.countries}+`, label: 'Countries Reached', icon: '🌍' },
            ].map((stat) => (
              <div className="about-stat-card" key={stat.label}>
                <span className="about-stat-icon">{stat.icon}</span>
                <h3 className="about-stat-value">{stat.value}</h3>
                <p className="subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values — Interactive ── */}
      <section className="section container">
        <div className="section-header centered">
          <span className="badge badge-glow">What Drives Us</span>
          <h2 className="section-title">Built on principles, not shortcuts.</h2>
          <p className="subtle section-tagline">
            Our values shape every decision — from course design to platform engineering.
          </p>
        </div>
        <div className="about-values-layout">
          <div className="about-values-tabs">
            {values.map((v, i) => (
              <button
                key={v.title}
                className={`about-values-tab ${activeValue === i ? 'active' : ''}`}
                onClick={() => setActiveValue(i)}
                type="button"
              >
                <span className="about-values-tab-icon">{v.icon}</span>
                <span>{v.title}</span>
              </button>
            ))}
          </div>
          <div className="about-values-detail card glass-card">
            <div className="about-values-detail-icon">{values[activeValue].icon}</div>
            <h3>{values[activeValue].title}</h3>
            <p className="subtle">{values[activeValue].detail}</p>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section about-timeline-section">
        <div className="container">
          <div className="section-header centered">
            <span className="badge badge-glow">Our Journey</span>
            <h2 className="section-title">From idea to impact.</h2>
            <p className="subtle section-tagline">
              Key milestones that shaped LMS Academy into what it is today.
            </p>
          </div>
          <div className="about-timeline">
            {milestones.map((m, i) => (
              <div className={`about-timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={m.event}>
                <div className="about-timeline-dot" />
                <div className="about-timeline-card card card-3d">
                  <span className="badge">{m.year}</span>
                  <p>{m.event}</p>
                </div>
              </div>
            ))}
            <div className="about-timeline-line" />
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="section container">
        <div className="section-header centered">
          <h2 className="section-title">How We Work</h2>
          <p className="subtle section-tagline">Our process — transparent, iterative, learner-centered.</p>
        </div>
        <div className="about-process-grid">
          {[
            {
              step: '01',
              title: 'Research & Design',
              detail: 'We study skill gaps, interview learners, and design outcomes-first curricula.',
              color: '#6366f1',
            },
            {
              step: '02',
              title: 'Build & Test',
              detail: 'Courses go through beta cohorts and get refined with real feedback before launch.',
              color: '#14b8a6',
            },
            {
              step: '03',
              title: 'Launch & Iterate',
              detail: 'We release, measure engagement, and ship improvements every single week.',
              color: '#f59e0b',
            },
          ].map((p) => (
            <div className="about-process-card card card-3d" key={p.step}>
              <div className="about-process-step" style={{ background: p.color }}>
                {p.step}
              </div>
              <h3>{p.title}</h3>
              <p className="subtle">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section about-team-section">
        <div className="container">
          <div className="section-header centered">
            <span className="badge badge-glow">Meet the Team</span>
            <h2 className="section-title">The people behind the platform.</h2>
            <p className="subtle section-tagline">
              A small, focused team building tools that make learning stick.
            </p>
          </div>
          <div className="about-team-grid">
            {team.map((member) => (
              <div className="about-team-card card card-3d" key={member.name}>
                <div className="about-team-avatar" style={{ background: member.gradient }}>
                  {member.name.charAt(0)}
                </div>
                <h3>{member.name}</h3>
                <span className="badge">{member.role}</span>
                <p className="subtle">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section container">
        <div className="about-cta card">
          <div className="about-cta-content">
            <h2 className="section-title">Ready to start learning?</h2>
            <p className="subtle">
              Join thousands of learners building real-world skills with structured tracks,
              mentorship, and a supportive community.
            </p>
            <div className="about-cta-actions">
              <Link className="button button-primary" to="/register">
                Create Free Account
              </Link>
              <Link className="button button-secondary" to="/courses">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
