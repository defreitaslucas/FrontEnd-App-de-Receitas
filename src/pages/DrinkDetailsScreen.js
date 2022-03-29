import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCocktailById } from '../services/fetchCocktail';
import { fetchRecomendedMeals } from '../services/fetchMealsDetails';
import './DetailsScreen.css';

const MAGIC_NUMBER_SIX = 6;

export default function DrinkDetailsScreen() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [id, setId] = useState('');
  const [recomendations, setRecomendations] = useState([]);

  const history = useHistory();
  const drinkPathArr = history.location.pathname.split('/');
  const drinkId = drinkPathArr[drinkPathArr.length - 1];

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
    setId(drinkId);

    const recomendedMeals = await fetchRecomendedMeals();
    setRecomendations(recomendedMeals);
  }, [id, drinkId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

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
        <button type="button" data-testid="share-btn">
          share
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

      <button type="button" data-testid="start-recipe-btn"> Iniciar receita</button>
    </main>
  );
}
