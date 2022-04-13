import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import MountRecipes from '../component/MountRecipes';
import './Styles/RecipesInProgress.css';

function RecipesInProgress(props) {
  const { match: { params: { recipeId } } } = props;
  const { location: { pathname } } = props;
  const [recipesInProgress, setRecipesInProgress] = useState();

  const fetchData = useCallback(async () => {
    if (pathname.includes('drinks')) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const response = await fetch(url);
      const drinkDetails = await response.json();
      setRecipesInProgress(drinkDetails);
    } else {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const response = await fetch(url);
      const mealDetails = await response.json();
      setRecipesInProgress(mealDetails);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mountRecipesComponent = () => {
    const { match: { params } } = props;
    const validador = Object.keys(recipesInProgress)[0] === 'meals'
      ? (
        <MountRecipes
          recipesInProgress={ recipesInProgress.meals || [] }
          idRecipes={ params }
        />)
      : (
        <MountRecipes
          recipesInProgress={
            recipesInProgress.drinks || []
          }
          idRecipes={ params }
        />);
    return validador;
  };

  return (
    <div className="recipes-in-progress-container">
      <h2>
        Recipes In Progress
      </h2>
      {
        recipesInProgress && mountRecipesComponent()
      }
    </div>

  );
}

RecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      path: PropTypes.string,
      recipeId: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesInProgress;
