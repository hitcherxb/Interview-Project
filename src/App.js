import './App.css';
import { Route } from 'react-router-dom'
import Signup from './components/signup/Signup'
import Home from './components/home/Home';
import LoginPage from './components/login/LoginPage';




function App() {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={Signup} />
    </div>
  );
}

export default App;
