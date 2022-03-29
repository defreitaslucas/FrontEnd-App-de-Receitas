import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchRecomendedDrinks } from '../services/fetchCocktail';
import { fetchMealById } from '../services/fetchMealsDetails';
import { verifyRecipeProgress } from '../helpers/localStorage';
import './DetailsScreen.css';

const MAGIC_NUMBER_SIX = 6;

export default function FoodDetailsScreen(props) {
  const [foodDetails, setFoodDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [id, setId] = useState('');
  const [recomendation, setRecomendations] = useState([]);
  const [recipeProgress, setRecipeProgress] = useState('new');

  const { match: { params: { recipeId } } } = props;

  const getInitialData = useCallback(async () => {
    const foodData = await fetchMealById(id);
    const ingredientsArr = Object.entries(foodData).filter(([key, value]) => (key
      .includes('strIngredient') && value));
    const measuresArr = Object.entries(foodData).filter(([key, value]) => (key
      .includes('strMeasure') && value));
    const ingredients = ingredientsArr.reduce((acc, data, index) => {
      acc = [...acc, `${data[1]} ${measuresArr[index][1]}`];
      return acc;
    }, []);
    setIngredientList(ingredients);
    setFoodDetails(foodData);
    setId(recipeId);

    const recomendedDrinks = await fetchRecomendedDrinks();
    setRecomendations(recomendedDrinks);

    setRecipeProgress(verifyRecipeProgress(recipeId, 'meals'));
  }, [id, recipeId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleStartButtonClick = () => {
    const { history: { push } } = props;
    push(`/foods/${id}/in-progress`);
  };

  return (
    <main>
      {console.log(props)}
      <h1 data-testid="recipe-title">
        { foodDetails.strMeal }
      </h1>
      <h3 data-testid="recipe-category">
        { foodDetails.strCategory }
      </h3>

      <nav>
        <button type="button" data-testid="share-btn">
          share
        </button>
        <button type="button" data-testid="favorite-btn">
          favorite
        </button>
      </nav>

      <div>
        <img
          src={ `${foodDetails.strMealThumb}/preview` }
          alt={ `${foodDetails.strMeal} preview` }
          data-testid="recipe-photo"
        />
      </div>

      <div>
        <ol className="ingredients-container">
          INGREDIENTES:
          { ingredientList.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </li>
          )) }
        </ol>
        <p data-testid="instructions" className="instruction-paragraph">
          { foodDetails.strInstructions }
        </p>
      </div>

      <div>
        <object
          data={ foodDetails.strVideo }
          data-testid="video"
        >
          { `${foodDetails.strGlass} prep video isn't disponible` }
        </object>
      </div>

      <div>
        Receitas recomendadas:
        <div
          className="recomendations-container"
        >
          {recomendation.map(({ idDrink, strDrinkThumb, strDrink }, index) => {
            if (index < MAGIC_NUMBER_SIX) {
              return (
                <div
                  key={ idDrink }
                  className="recomended-iten"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ `${strDrinkThumb}/preview` }
                    alt={ `${strDrink} recomendation` }
                  />
                  <span data-testid={ `${index}-recomendation-title` }>
                    { strDrink }
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

FoodDetailsScreen.propTypes = {
  recipeId: PropTypes.string.isRequired,
}.isRequired;
