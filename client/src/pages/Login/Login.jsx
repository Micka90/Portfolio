import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

function Login() {
  const mailRef = useRef();
  const passwordRef = useRef();
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      if (response.ok) {
        const token = response.headers.get('Authorization')?.split(' ')[1];
        const user = await response.json();

        if (user && user.id && token) {
          setAuth({ ...user, token });
        } else {
          console.warn('Utilisateur ou token invalide après login :', user, token);
          setAuth(null);
        }
      } else {
        console.error('Erreur de connexion :', await response.json());
      }
    } catch (err) {
      console.error('Erreur lors du login :', err);
    }
  };

  return (
    <section>
      <form className="logininput" onSubmit={handleSubmit}>
        <input
          className="inputlogin"
          type="email"
          ref={mailRef}
          placeholder="Email"
        />
        <input
          className="inputlogin"
          type="password"
          ref={passwordRef}
          placeholder="Mot de passe"
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
