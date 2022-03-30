import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar({ page }) { // eslint-disable-line
  const { setFoods, setDrinks } = useContext(MyContext);
  const [searchBarValue, setSearchBarValue] = useState(''); // eslint-disable-line
  const [radioSearch, setRadioSearch] = useState('');

  function handleChange(value) {
    setRadioSearch(value);
  }

  function handleClick() {
    if (radioSearch === 'First Letter' && searchBarValue.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    if (page === 'Foods') {
      setFoods((prevState) => ({
        ...prevState, radioSearch, searchBarValue,
      }));
    }
    if (page === 'Drinks') {
      setDrinks((prevState) => ({
        ...prevState, radioSearch, searchBarValue,
      }));
    }
  }

  return (
    <form className="search-bar">
      <input
        data-testid="search-input"
        className="search-bar--input-text"
        type="text"
        placeholder="search"
        onChange={ ({ target }) => setSearchBarValue(target.value) }
      />
      <section className="search-bar--input-radio">
        Ingredients
        <input
          data-testid="ingredient-search-radio"
          id="Ingredient"
          name="radioSearch"
          type="radio"
          value="Ingredient"
          onChange={ ({ target }) => handleChange(target.value) }
        />
        Name
        <input
          data-testid="name-search-radio"
          id="Name"
          name="radioSearch"
          type="radio"
          value="Name"
          onChange={ ({ target }) => handleChange(target.value) }
        />
        First Letter
        <input
          data-testid="first-letter-search-radio"
          id="First Letter"
          name="radioSearch"
          type="radio"
          value="First Letter"
          onChange={ ({ target }) => handleChange(target.value) }
        />
        <button
          data-testid="exec-search-btn"
          type="button"
          name="radioSearch"
          onClick={ handleClick }
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
