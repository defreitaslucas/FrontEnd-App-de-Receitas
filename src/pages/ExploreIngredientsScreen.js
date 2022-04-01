import React, { useState, useCallback, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchCocktailDetails } from '../services/fetchCocktail';
import { fetchMealsDetails } from '../services/fetchMealsDetails';
import { isFoodCheckStr } from '../helpers';
import MyContext from '../context/MyContext';
import './ExploreIngredientsScreen.css';
import FooterMenu from '../component/FooterMenu';
import Header from '../component/Header';

const MAGIC_NUMBER_TWELVE = 12;

export default function ExploreIngredientsScreen({ location, history }) {
  const isFood = location.pathname.includes('foods');
  const isFoodStr = isFoodCheckStr(isFood);

  const { setFoods, setDrinks } = useContext(MyContext);

  const [ingredients, setIngredients] = useState([]);

  const setInitialData = useCallback(async () => {
    const listIngredientsData = isFood
      ? await fetchMealsDetails('i')
      : await fetchCocktailDetails('i');
    const listIngredients = listIngredientsData.meals || listIngredientsData.drinks;
    setIngredients(listIngredients);
  }, [isFood]);

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  const handleCardClick = (ingredientName) => {
    if (isFood) {
      setFoods((prevState) => ({
        ...prevState, radioSearch: 'Ingredient', searchBarValue: ingredientName,
      }));
      history.push('/foods');
    } else {
      setDrinks((prevState) => ({
        ...prevState, radioSearch: 'Ingredient', searchBarValue: ingredientName,
      }));
      history.push('/drinks');
    }
  };

  return (
    <main>
      <Header title="Explore Nationalities" />
      <header>
        {console.log(location.pathname.includes('foods'))}
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
                <button
                  type="button"
                  onClick={ () => handleCardClick(strIngredient || strIngredient1) }
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
                </button>
              );
            }
            return null;
          })}
      </section>
      <FooterMenu />
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
