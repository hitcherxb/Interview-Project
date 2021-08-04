import './App.css';
import { Route } from 'react-router-dom'
import Signup from './components/signup/Signup'
import Home from './components/home/Home';
import LoginPage from './components/login/LoginPage';
import Profile from './components/profile/Profile';
import Feed from './components/Feed/Feed.jsx'





function App() {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={Signup} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/feed' component={Feed} />
    </div>
  );
}

export default App;
