import React from 'react';
import PropTypes from 'prop-types';

export default function ExploreScreen({ history: { push } }) {
  return (
    <main>
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => push('/explore/foods') }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => push('/explore/drinks') }
      >
        Explore Drinks
      </button>
    </main>
  );
}

ExploreScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
