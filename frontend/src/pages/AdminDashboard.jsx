import { useEffect, useMemo, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { deleteUser, getUsers } from '../services/userService.js';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const analytics = useMemo(() => {
    const total = users.length;
    const admins = users.filter((user) => user.role === 'admin').length;
    const instructors = users.filter((user) => user.role === 'instructor').length;
    const students = users.filter((user) => user.role === 'student').length;
    return { total, admins, instructors, students };
  }, [users]);

  const handleDelete = async (id) => {
    setMessage('');
    try {
      await deleteUser(id);
      setMessage('User deleted successfully.');
      await loadUsers();
    } catch (error) {
      setMessage(error.message || 'Unable to delete user.');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h2 className="section-title">Admin Dashboard</h2>
      <div className="grid grid-3">
        <div className="card">
          <p className="subtle">Total Users</p>
          <h3>{analytics.total}</h3>
        </div>
        <div className="card">
          <p className="subtle">Instructors</p>
          <h3>{analytics.instructors}</h3>
        </div>
        <div className="card">
          <p className="subtle">Students</p>
          <h3>{analytics.students}</h3>
        </div>
      </div>
      {message && <p className="subtle" style={{ marginTop: '1rem' }}>{message}</p>}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3>All Users</h3>
        <div className="grid">
          {users.map((user) => (
            <div className="user-row" key={user._id}>
              <div>
                <strong>{user.name}</strong>
                <p className="subtle">{user.email}</p>
              </div>
              <div className="user-actions">
                <span className="badge">{user.role}</span>
                <button className="button button-secondary" onClick={() => handleDelete(user._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
