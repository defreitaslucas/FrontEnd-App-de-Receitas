import PropTypes from 'prop-types';
import React, { useState } from 'react';

function SearchBar({ page }) {// eslint-disable-line
  const [searchBarValue, setSearchBarValue] = useState(''); // eslint-disable-line
  const [nameValue, setNameValue] = useState(''); // eslint-disable-line
  const [ingredientsValue, setIngredientsValue] = useState(''); // eslint-disable-line
  const [firstLetterValue, setfirstLetterValue] = useState(''); // eslint-disable-line

  const handleChange = (target) => {
    console.log(target.value);
  };

  return (
    <form className="search-bar">
      <input
        className="search-bar--input-text"
        type="text"
        placeholder="search"
        onChange={ ({ target }) => setSearchBarValue(target.value) }
      />
      <section className="search-bar--input-radio">
        Ingredients
        <input
          data-testid="ingredient-search-radio"
          id="Ingredients"
          name="radioSearch"
          type="radio"
          value="Ingredients"
          onChange={ ({ target }) => handleChange(target) }
        />
        Name
        <input
          data-testid="name-search-radio"
          id="Name"
          name="radioSearch"
          type="radio"
          value="Name"
          onChange={ ({ target }) => handleChange(target) }
        />
        First Letter
        <input
          data-testid="first-letter-search-radio"
          id="First Letter"
          name="radioSearch"
          type="radio"
          value="First Letter"
          onChange={ ({ target }) => handleChange(target) }
        />
        <button
          data-testid="exec-search-btn"
          type="button"
          name="radioSearch"
          onClick={ ({ target }) => console.log(target.value) }
        >
          search
        </button>
      </section>
    </form>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchBar;
