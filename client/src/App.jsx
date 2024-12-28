import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Nav from './components/NavBar/Nav';
import './App.css';

function App() {
  const { auth } = useAuth();

  return (
    <div>
      <Nav />
      <Outlet context={auth} />
    </div>
  );
}

export default App;
