import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';

function Login() {
  const mailRef = useRef();
  const passwordRef = useRef();
  const { setAuth } = useAuth();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false); // État de succès

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mailRef.current.value || !passwordRef.current.value) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: mailRef.current.value,
            password: passwordRef.current.value,
          }),
          credentials: 'include',
        }
      );

      if (response.status === 200) {
        const token = response.headers.get('Authorization');
        const user = await response.json();
        setAuth({ token, user });
        setSuccess(true); // Définir l'état de succès à `true`
        setError(false); // Réinitialiser l'état d'erreur
      } else {
        setError('Email ou mot de passe incorrect');
        setSuccess(false); // Réinitialiser l'état de succès
        console.info(response);
      }
    } catch (err) {
      setError('Une erreur est survenue, veuillez réessayer');
      setSuccess(false); // Réinitialiser l'état de succès
      console.error(err);
    }
  };

  return (
    <section>
      <form className="logininput" onSubmit={handleSubmit}>
        <input className="inputlogin" type="email" ref={mailRef} placeholder="Email" />
        <input className="inputlogin" type="password" ref={passwordRef} placeholder="Mot de passe" />
        <button type="submit">Login</button>
        {success && <p className="success-message">Connexion réussie !</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}

export default Login;
