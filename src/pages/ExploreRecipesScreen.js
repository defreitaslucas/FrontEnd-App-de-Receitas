import React from 'react';
import PropTypes from 'prop-types';

export default function ExploreRecipesScreen({ location }) {
  const isFood = location.pathname.includes('foods');
  return (
    <main>
      <header>
        <nav>
          <button type="button" data-testid="explore-by-ingredient">
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
