import './App.css';
import Home from './components/Home';
import Login from './components/login';
import NavBar from './components/NavBar';
import { routes } from './routes';
import { useRoutes } from 'react-router'
function App() {
  const element = useRoutes(routes)
  return (
    <div className="">
      <NavBar></NavBar>
      {element}
    </div>
  );
}

export default App;
