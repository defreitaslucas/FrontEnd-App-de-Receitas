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
      <Route path="/foods/:recipeId" component={ FoodDetailsScreen } />
      <Route
        exact
        path="/foods/:recipeId"
        render={ (props) => <FoodDetailsScreen { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:recipeId"
        render={ (props) => <DrinkDetailsScreen { ...props } /> }
      />
      <Route path="/foods/:recipeId/in-progress" component={ Login } />
      <Route path="/drinks/:recipeId/in-progress" component={ Login } />

      {/* <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} />
      <Route path="/" component={} /> */}
    </Switch>
  );
}

export default App;
