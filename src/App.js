import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exatc path="/" component={ Login } />
      {/* <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} /> */}
    </Switch>
  );
}

export default App;
