import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchCocktailById } from '../services/fetchCocktail';
import { fetchRecomendedMeals } from '../services/fetchMealsDetails';
import { verifyRecipeProgress } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';

import './DetailsScreen.css';

const MAGIC_NUMBER_SIX = 6;

export default function DrinkDetailsScreen(props) {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [id, setId] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [recipeProgress, setRecipeProgress] = useState('new');

  const { match: { params: { recipeId } } } = props;

  const getInitialData = useCallback(async () => {
    const drinkData = await fetchCocktailById(id);
    const ingredientsArr = Object.entries(drinkData).filter(([key, value]) => (key
      .includes('strIngredient') && value));
    const measuresArr = Object.entries(drinkData).filter(([key, value]) => (key
      .includes('strMeasure') && value));
    const ingredients = ingredientsArr.reduce((acc, data, index) => {
      acc = [...acc, `${data[1]} ${measuresArr[index][1]}`];
      return acc;
    }, []);
    setIngredientList(ingredients);
    setDrinkDetails(drinkData);
    setId(recipeId);

    const recomendedMeals = await fetchRecomendedMeals();
    setRecomendations(recomendedMeals);

    setRecipeProgress(verifyRecipeProgress(recipeId, 'cocktails'));
  }, [id, recipeId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleStartButtonClick = () => {
    const { history: { push } } = props;
    push(`/drinks/${id}/in-progress`);
  };

  const handleShareButtonClick = ({ currentTarget }) => {
    const { location: { pathname } } = props;
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    currentTarget.classList.toggle('popUp-container');
  };

  return (
    <main>
      <h1 data-testid="recipe-title">
        { drinkDetails.strDrink ?? drinkDetails.strGlass }
      </h1>
      <h3 data-testid="recipe-category">
        {drinkDetails.strAlcoholic}
        {' '}
        { drinkDetails.strCategory }
      </h3>

      <nav>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShareButtonClick }
          className="popUp-container"
        >
          <span className="popUp">Link copied!</span>
          <img src={ shareIcon } alt="share button" />
        </button>

        <button type="button" data-testid="favorite-btn">
          favorite
        </button>
      </nav>

      <div>
        <img
          src={ `${drinkDetails.strDrinkThumb}/preview` }
          alt={ `${drinkDetails.strDrink ?? drinkDetails.strGlass} preview` }
          data-testid="recipe-photo"
        />
      </div>

      <div>
        <ol>
          INGREDIENTES:
          { ingredientList.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </li>
          )) }
        </ol>
        <p data-testid="instructions">
          { drinkDetails.strInstructions }
        </p>
      </div>

      <div>
        Receitas recomendadas:
        <div
          className="recomendations-container"
        >
          {recomendations.map(({ idMeal, strMealThumb, strMeal }, index) => {
            if (index < MAGIC_NUMBER_SIX) {
              return (
                <div
                  className="recomended-iten"
                  key={ idMeal }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ `${strMealThumb}/preview` }
                    alt={ `${strMeal} recomendation` }
                  />
                  <span data-testid={ `${index}-recomendation-title` }>
                    { strMeal }
                  </span>
                </div>
              );
            } return null;
          })}
        </div>
      </div>

      {recipeProgress === 'done'
        ? 'Nice Job!!'
        : (
          <button
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
            name="Start Recipe"
            onClick={ handleStartButtonClick }
          >
            { recipeProgress === 'new' ? 'Start Recipe' : 'Continue Recipe' }
          </button>)}
    </main>
  );
}

DrinkDetailsScreen.propTypes = {
  recipeId: PropTypes.string.isRequired,
}.isRequired;
