import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

function Login() {
  const mailRef = useRef();
  const passwordRef = useRef();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [shown, setShown] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth?.id) {
      navigate('/Admin');
    }
  }, [auth, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mailRef.current.value || !passwordRef.current.value) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: mailRef.current.value,
            password: passwordRef.current.value,
          }),
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (response.ok && data.accessToken) {
        const userAuth = {
          id: data.id,
          name: data.name,
          email: data.email,
          is_admin: data.is_admin,
          token: data.accessToken,
        };

        setAuth(userAuth);

        navigate('/Admin');
      } else {
        setError('Utilisateur ou token invalide.');
        console.warn('⚠️ Problème avec la réponse serveur :', data);
      }
    } catch (err) {
      setError('Erreur serveur. Veuillez réessayer plus tard.');
      console.error('❌ Erreur lors du login :', err);
    }
  };

  return (
    <section className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Email
          <input
            className="inputlogin"
            type="email"
            ref={mailRef}
            placeholder="Email"
          />
        </label>
        <label className="login-label">
          Mot de passe
          <div className="password-input-container">
            <input
              className="inputlogin"
              type={shown ? 'text' : 'password'}
              ref={passwordRef}
              placeholder="Mot de passe"
            />
            {shown ? (
              <FiEye className="reveal" onClick={() => setShown(!shown)} />
            ) : (
              <FiEyeOff className="reveal" onClick={() => setShown(!shown)} />
            )}
          </div>
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>
    </section>
  );
}

export default Login;
