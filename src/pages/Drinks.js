import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../component/Header';
import FooterMenu from '../component/FooterMenu';

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
    <div>
      <Header title="Drinks" />
      {
        (drinksList.length > 0)
          ? (
            drinksList.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
              <div key={ index }>
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
                <Link
                  to={ `/drinks/${idDrink}` }
                  data-testid={ `${index}-recipe-card` }
                >
                  Ver Detalhes
                </Link>
              </div>
            ))
          )
          : null
      }
      {
        (drinksCategories.length > 0)
          ? (
            drinksCategories.map((category) => (
              <button
                key={ category }
                type="button"
                onClick={ () => addFilter(category) }
                data-testid={ `${category}-category-filter` }
              >
                { category }
              </button>
            ))
          )
          : null
      }
      <button
        type="button"
        onClick={ removeFilter }
        data-testid="All-category-filter"
      >
        Remover Filtro
      </button>
      <FooterMenu />
    </div>
  );
}

export default Drinks;
