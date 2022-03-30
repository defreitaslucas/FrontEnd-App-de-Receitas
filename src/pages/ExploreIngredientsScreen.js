import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCocktailDetails } from '../services/fetchCocktail';
import { fetchMealsDetails } from '../services/fetchMealsDetails';
import './ExploreIngredientsScreen.css';

const MAGIC_NUMBER_TWELVE = 12;

export default function ExploreIngredientsScreen({ location }) {
  const isFood = location.pathname.includes('foods');
  const isFoodStr = isFood ? 'foods' : 'drinks';
  const [ingredients, setIngredients] = useState([]);

  const setInitialData = useCallback(async () => {
    const listIngredientsData = isFood
      ? await fetchMealsDetails('i')
      : await fetchCocktailDetails('i');
    const listIngredients = isFood
      ? listIngredientsData.meals
      : listIngredientsData.drinks;
    setIngredients(listIngredients);
  }, [isFood]);

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  return (
    <main>
      <header>
        <h1>
          { isFoodStr.toUpperCase() }
          {' '}
          INGREDIENTS
        </h1>
      </header>
      <section>
        {ingredients
          .map((ingredientData, index) => {
            if (index < MAGIC_NUMBER_TWELVE) {
              const { idIngredient, strDescription, strIngredient } = ingredientData;
              const { strIngredient1 } = ingredientData;
              const img = isFood
                ? `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
              return (
                <div
                  key={ isFood ? idIngredient : strIngredient1 }
                  data-testid={ `${index}-ingredient-card` }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ img }
                    alt={ `${strIngredient}; click to see recipes with this ingredient` }
                  />
                  <h4 data-testid={ `${index}-card-name` }>
                    {strIngredient || strIngredient1}
                  </h4>
                  <p className="ingredient-description">
                    {strDescription}
                  </p>
                </div>
              );
            }
            return null;
          })}
      </section>
    </main>
  );
}

ExploreIngredientsScreen.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
