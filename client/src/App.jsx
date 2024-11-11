import { Outlet } from 'react-router-dom';
import Nav from './components/NavBar/Nav';
import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
