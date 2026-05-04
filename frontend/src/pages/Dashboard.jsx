import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import StudentDashboard from './student/Dashboard.jsx';
import InstructorDashboard from './instructor/Dashboard.jsx';
import AdminDashboard from './admin/Dashboard.jsx';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user?.role) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'student') {
    return <StudentDashboard />;
  }

  if (user.role === 'instructor') {
    return <InstructorDashboard />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <Navigate to="/" replace />;
};

export default Dashboard;
