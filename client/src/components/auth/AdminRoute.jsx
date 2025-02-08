import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function AdminRoute({ children }) {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (auth.is_admin !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
