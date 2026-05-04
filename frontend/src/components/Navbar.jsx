import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link className="logo" to="/">
          LMS Academy
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        </nav>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="badge">{user?.name || 'User'}</span>
              <button className="button button-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink className="button button-primary" to="/register">
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
