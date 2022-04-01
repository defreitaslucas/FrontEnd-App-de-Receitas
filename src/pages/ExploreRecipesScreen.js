import React from 'react';
import PropTypes from 'prop-types';
import { fetchRandomMeal } from '../services/fetchMealsDetails';
import { fetchRandomCocktail } from '../services/fetchCocktail';
import FooterMenu from '../component/FooterMenu';
import Header from '../component/Header';

export default function ExploreRecipesScreen({ location, history }) {
  const isFood = location.pathname.includes('foods');
  const isFoodStr = isFood ? 'foods' : 'drinks';

  const handleSurpriseBtnClick = async () => {
    if (isFood) {
      const randomMeal = await fetchRandomMeal();
      history.push(`/${isFoodStr}/${randomMeal.idMeal}`);
    } else {
      const randomDrink = await fetchRandomCocktail();
      history.push(`/${isFoodStr}/${randomDrink.idDrink}`);
    }
  };

  return (
    <main>
      {
        location.pathname.includes('foods')
          ? <Header title="Explore Foods" /> : <Header title="Explore Drinks" />
      }
      <header>
        <nav>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            onClick={ () => history.push(`/explore/${isFoodStr}/ingredients`) }
          >
            By Ingredient
          </button>
          { isFood && (
            <button
              type="button"
              data-testid="explore-by-nationality"
              onClick={ () => history.push('/explore/foods/nationalities') }
            >
              By Nationality
            </button>
          )}
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ handleSurpriseBtnClick }
          >
            Surprise me!
          </button>
        </nav>
      </header>
      ExploreRecipesScreen
      <FooterMenu />
    </main>
  );
}

ExploreRecipesScreen.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
