import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
<<<<<<< HEAD
<<<<<<< HEAD
import Feedback from './pages/Feedback';
=======
// import Feedback from './pages/Feedback';
>>>>>>> 00daac418362281a1b48b7d54828ad9ff346d5cb
=======
// import Feedback from './pages/Feedback';
>>>>>>> 0f0c97c789a2d9418abf7667b4e9e915080439fb
import Trivia from './pages/Trivia';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="feedback" component={ Feedback } />
=======
      {/* <Route path="feedback" component={ Feedback } /> */}
>>>>>>> 00daac418362281a1b48b7d54828ad9ff346d5cb
=======
      {/* <Route path="feedback" component={ Feedback } /> */}
>>>>>>> 0f0c97c789a2d9418abf7667b4e9e915080439fb
      <Route path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
