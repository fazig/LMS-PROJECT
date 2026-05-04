import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    const errors = {};

    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Enter a valid email.';
    }

    if (!form.password.trim()) {
      errors.password = 'Password is required.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    const result = await login(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2 className="section-title">Welcome back</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input className="input" type="email" name="email" value={form.email} onChange={handleChange} />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </label>
          <label>
            Password
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="error-text">{formErrors.password}</p>}
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="subtle" style={{ marginTop: '1rem' }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
