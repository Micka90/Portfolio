import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Nav from './components/NavBar/Nav';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const { auth } = useAuth();

  return (
    <div className="app-container">
      <Nav />
      <div className="main-content">
        <Outlet context={auth} />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
