import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/drinks/:id" component={ DrinkDetails } />
        <Route path="/foods/:id" component={ FoodDetails } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/foods" component={ Foods } />
        <Route path="/" component={ Login } />
        {/*  <Route path="/" component={} />
        <Route path="/" component={} />
        <Route path="/" component={} /> */}
      </Switch>
    </Provider>
  );
}

export default App;
