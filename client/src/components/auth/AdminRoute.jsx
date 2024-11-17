import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';

function AdminRoute({ children }) {
  const { auth } = useAuth();

  if (!auth || !auth.user.is_admin) {
    <div>
      Accès refusé. Vous n&apos;avez pas les droits nécessaires pour accéder à
      cette page.
    </div>;
  }
  return children;
}
export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
