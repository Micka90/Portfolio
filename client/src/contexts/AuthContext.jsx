import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/refresh`,
          { credentials: 'include' }
        );

        if (response.status === 204) {
          console.warn('⚠️ Aucune session active, pas de token reçu.');
          setAuth(null);
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          console.warn('⚠️ Échec du rafraîchissement du token.');
          setAuth(null);
          setIsLoading(false);
          return;
        }

        const text = await response.text();
        if (!text) {
          console.warn('⚠️ Réponse vide du serveur.');
          setAuth(null);
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(text);
        const token = response.headers.get('Authorization')?.split(' ')[1];

        if (user && user.id && token) {
          setAuth({ ...user, token });
        } else {
          console.warn('⚠️ Données utilisateur invalides après refresh.');
          setAuth(null);
        }
      } catch (error) {
        console.error("❌ Erreur lors du rafraîchissement de l'auth :", error);
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };

    getAuth();
  }, []);

  const value = useMemo(
    () => ({ auth, setAuth, isLoading }),
    [auth, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
