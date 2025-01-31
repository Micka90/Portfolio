import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import ProjectDétail from './pages/Project/Projectdétail';
import AdminRoute from './components/auth/AdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/Project/:id',
        element: <ProjectDétail />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Admin',
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
