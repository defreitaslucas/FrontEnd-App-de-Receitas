import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../component/Header';
import FooterMenu from '../component/FooterMenu';
import './Styles/Drinks.css';

function Drinks() {
  const { drinksList, drinksCategories, selectedDrinksCategory, setDrinks,
  } = useContext(MyContext);

  function addFilter(category) {
    setDrinks((prevState) => {
      if (category === selectedDrinksCategory) {
        return ({
          ...prevState,
          selectedCategory: '',
        });
      }
      return ({
        ...prevState,
        selectedCategory: category,
      });
    });
  }

  function removeFilter() {
    setDrinks((prevState) => ({
      ...prevState,
      selectedCategory: '',
    }));
  }

  return (
    <>
      <Header title="Drinks" />
      <main className="drinks-container">
        {
          (drinksCategories.length > 0)
            ? (
              <div className="drinks-container--category">
                {drinksCategories.map((category) => (
                  <button
                    key={ category }
                    type="button"
                    onClick={ () => addFilter(category) }
                    data-testid={ `${category}-category-filter` }
                  >
                    { category }
                  </button>
                ))}
              </div>
            )
            : null
        }
        {
          (drinksList.length > 0)
            ? (
              drinksList.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
                <Link
                  to={ `/drinks/${idDrink}` }
                  data-testid={ `${index}-recipe-card` }
                  key={ index }
                >
                  <div className="drinks-container--card">
                    <img
                      src={ strDrinkThumb }
                      alt={ strDrink }
                      data-testid={ `${index}-card-img` }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      { strDrink }
                    </p>
                    <p className="drinks-container--detail-view">
                      Ver Detalhes
                    </p>
                  </div>
                </Link>
              ))
            )
            : null
        }
        <button
          name="All"
          type="button"
          onClick={ removeFilter }
          data-testid="All-category-filter"
        >
          All
        </button>
      </main>
      <FooterMenu />
    </>
  );
}

export default Drinks;
