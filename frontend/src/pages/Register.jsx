import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = () => {
    const errors = {};

    if (!form.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Enter a valid email.';
    }

    if (!form.password.trim()) {
      errors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
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

    const result = await register(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="card auth-card">
        <h2 className="section-title">Create your account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input className="input" name="name" value={form.name} onChange={handleChange} />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </label>
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
          <label>
            Role
            <select className="input" name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          {error && <p className="error-text">{error}</p>}
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="subtle" style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
