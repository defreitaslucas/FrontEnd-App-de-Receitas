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
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipesScreen from './pages/FavoriteRecipesScreen';
import ProfileScreen from './pages/ProfileScreen';
import ExploreScreen from './pages/ExploreScreen';
import ExploreRecipesScreen from './pages/ExploreRecipesScreen';
import ExploreIngredientsScreen from './pages/ExploreIngredientsScreen';
import ExploreRegionalFoodScreen from './pages/ExploreRegionalFoodScreen';
import Error404 from './pages/Error404';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/drinks/:recipeId" component={ DrinkDetailsScreen } />
        <Route exact path="/foods/:recipeId" component={ FoodDetailsScreen } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipesScreen } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/profile" component={ ProfileScreen } />
        <Route
          exact
          path="/foods/:recipeId/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/drinks/:recipeId/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreIngredientsScreen }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreIngredientsScreen }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreRegionalFoodScreen }
        />
        <Route exact path="/explore/foods" component={ ExploreRecipesScreen } />
        <Route exact path="/explore/drinks" component={ ExploreRecipesScreen } />
        <Route exact path="/explore" component={ ExploreScreen } />
        <Route path="/" component={ Error404 } />
      </Switch>
    </Provider>
  );
}

export default App;
