import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <div className="card">
        <h2 className="section-title">Page not found</h2>
        <p className="subtle">We couldn't find the page you were looking for.</p>
        <Link className="button button-primary" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
