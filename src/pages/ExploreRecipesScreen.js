import React from 'react';
import PropTypes from 'prop-types';

export default function ExploreRecipesScreen({ location, history }) {
  const isFood = location.pathname.includes('foods');
  const isFoodStr = isFood ? 'foods' : 'drinks';
  return (
    <main>
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
            <button type="button" data-testid="explore-by-nationality">
              By Nationality
            </button>
          )}
          <button type="button" data-testid="explore-surprise">
            Surprise me!
          </button>
        </nav>
      </header>
      ExploreRecipesScreen
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
