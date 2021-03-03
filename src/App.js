import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import ConfigScreen from './pages/ConfigScreen';
import ConfigButton from './components/ConfigButton';

export default function App() {
  return (
    <Switch>
      <Route path="/configscreen" component={ ConfigScreen } />
      <ConfigButton />
    </Switch>
  );
}
