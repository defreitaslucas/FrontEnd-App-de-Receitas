import React, { useState } from 'react';

function SearchBar() {
  const [searchBarValue, setSearchBarValue] = useState('');
  console.log(searchBarValue);
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
        />
        Name
        <input
          data-testid="name-search-radio"
          id="Name"
          name="radioSearch"
          type="radio"
          value="Name"
        />
        First Letter
        <input
          data-testid="first-letter-search-radio"
          id="First Letter"
          name="radioSearch"
          type="radio"
          value="First Letter"
        />
        <button data-testid="exec-search-btn" type="button"> search </button>
      </section>
    </form>
  );
}

export default SearchBar;
