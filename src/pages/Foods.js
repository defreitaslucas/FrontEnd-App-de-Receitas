import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../component/Header';
import FooterMenu from '../component/FooterMenu';
import './Styles/Foods.css';

function Foods() {
  const {
    foodsList, foodsCategories, selectedFoodsCategory, setFoods,
  } = useContext(MyContext);

  function addFilter(category) {
    setFoods((prevState) => {
      if (category === selectedFoodsCategory) {
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
    setFoods((prevState) => ({
      ...prevState,
      selectedCategory: '',
    }));
  }

  return (
    <>
      <Header title="Foods" />
      <main className="foods-container">
        {
          (foodsCategories.length > 0)
            ? (
              <div className="foods-container--category">

                {foodsCategories.map((category) => (
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
          (foodsList.length > 0)
            ? (
              foodsList.map(({ strMealThumb, strMeal, idMeal }, index) => (
                <Link
                  key={ index }
                  to={ `/foods/${idMeal}` }
                  data-testid={ `${index}-recipe-card` }
                >
                  <div className="foods-container--card">
                    <img
                      src={ strMealThumb }
                      alt={ strMeal }
                      data-testid={ `${index}-card-img` }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      { strMeal }
                    </p>
                    <p className="foods-container--detail-view">
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
          style={ { fontWeight: '900' } }
        >
          All
        </button>
      </main>
      <FooterMenu />
    </>
  );
}

export default Foods;
