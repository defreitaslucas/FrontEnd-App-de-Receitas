import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDetailsScreen from './pages/FoodDetailsScreen';
import DrinkDetailsScreen from './pages/DrinkDetailsScreen';
import FavoriteRecipesScreen from './pages/FavoriteRecipesScreen';
import ProfileScreen from './pages/ProfileScreen';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/drinks/:recipeId" component={ DrinkDetailsScreen } />
        <Route exact path="/foods/:recipeId" component={ FoodDetailsScreen } />
        <Route path="/foods/:recipeId/in-progress" component={ Login } />
        {/* // temporariamente direcionando à tela de login; */}
        <Route path="/drinks/:recipeId/in-progress" component={ Login } />
        {/* // temporariamente direcionando à tela de login; */}
        <Route path="/drinks" component={ Drinks } />
        <Route path="/favorite-recipes" component={ FavoriteRecipesScreen } />
        <Route path="/foods" component={ Foods } />
        <Route path="/profile" component={ ProfileScreen } />
        <Route path="/" component={ Login } />
        {/*  <Route path="/" component={} />
        <Route path="/" component={} /> */}
      </Switch>
    </Provider>
  );
}

export default App;
