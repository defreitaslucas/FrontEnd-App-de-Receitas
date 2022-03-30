import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function FooterMenu() {
  return (
    <nav className="footer-menu" data-testid="footer">
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="icone para pagina drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="icone para pagina explore"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="icone para pagina meal"
          data-testid="food-bottom-btn"
        />
      </Link>
    </nav>
  );
}

export default FooterMenu;
