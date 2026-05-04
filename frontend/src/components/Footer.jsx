const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3 className="footer-title">LMS Academy</h3>
          <p className="subtle">
            Empowering students, instructors, and teams with modern, skill-focused learning.
          </p>
        </div>
        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li>Courses</li>
            <li>Pricing</li>
            <li>Team</li>
            <li>Support</li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-links">
            <li>support@lmsacademy.com</li>
            <li>+92 300 123 4567</li>
            <li>Karachi, Pakistan</li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Admin</h4>
          <p className="subtle">Muhammad Faizan</p>
          <p className="subtle">Platform Administrator</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 LMS Academy. All rights reserved.</span>
        <span className="subtle">Learn. Teach. Grow.</span>
      </div>
    </footer>
  );
};

export default Footer;
