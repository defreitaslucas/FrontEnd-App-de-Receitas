import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import FoodDetailsScreen from './pages/FoodDetailsScreen';
import DrinkDetailsScreen from './pages/DrinkDetailsScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods/:mealId" component={ FoodDetailsScreen } />
      <Route path="/drinks/:drinkId" component={ DrinkDetailsScreen } />
      {/* <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} /> */}
    </Switch>
  );
}

export default App;
