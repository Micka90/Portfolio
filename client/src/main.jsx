import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import React from 'react';
import ReactDOM from 'react-dom/client';

import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
