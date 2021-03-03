import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

import './styles/index.css';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
