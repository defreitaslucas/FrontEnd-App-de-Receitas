import PropTypes from 'prop-types';
import React from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  return (
    <section className="header-component">
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="icone de perfil" />
      </button>
      <h2 data-testid="page-title">{title}</h2>
      { title === 'foods' || title === 'explore nationalities'
        ? (
          <button type="button" data-testid="search-top-btn">
            <img src={ searchIcon } alt="lupa de procura" />
          </button>
        )
        : null }
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
