import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './Styles/Header.css';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);

  const handleClick = () => {
    if (searchBar === false) {
      setSearchBar(true);
    } else if (searchBar === true) {
      setSearchBar(false);
    }
  };

  return (
    <div className="header-container">
      <section className="header-container--section-icons">
        <Link to="/profile">
          <img
            className="header-container--profile-icon"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="icone de perfil"
            width="22px"
          />
        </Link>
        <h4 data-testid="page-title">{title}</h4>
        { title === 'Foods'
        || title === 'Drinks'
        || title === 'Explore Nationalities'
          ? (
            <button
              className="header-container--button-magnifier"
              type="button"
              onClick={ handleClick }
              style={ { width: '22px' } }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="lupa de procura"
                width="32px"
              />
            </button>
          )
          : null }
      </section>

      {searchBar
        ? <SearchBar page={ title } />
        : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
