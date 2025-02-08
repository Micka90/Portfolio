import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        if (auth?.token) return;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/refresh`,
          { credentials: 'include' }
        );

        console.log('🔍 Réponse du refresh :', response);

        if (response.ok) {
          const user = await response.json();
          const token = response.headers.get('Authorization')?.split(' ')[1];

          if (user && user.id && token) {
            setAuth({ ...user, token });
          } else {
            console.warn(
              ' Utilisateur ou token invalide après refresh :',
              user,
              token
            );
            setAuth(null);
          }
        } else {
          console.warn(' Échec du rafraîchissement du token.');
          setAuth(null);
        }
      } catch (error) {
        console.error(" Erreur lors du rafraîchissement de l'auth :", error);
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };

    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
