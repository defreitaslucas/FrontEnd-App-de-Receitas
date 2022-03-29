import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

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
    <div>
      {
        (foodsList.length > 0)
          ? (
            foodsList.map(({ strMealThumb, strMeal }, index) => (
              <Link
                key={ index }
                to={ `/foods/${strMeal}` }
                data-testid={ `${index}-recipe-card` }
              >
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
              </Link>
            ))
          )
          : null
      }
      {
        (foodsCategories.length > 0)
          ? (
            foodsCategories.map((category) => (
              <button
                key={ category }
                type="button"
                onClick={ () => addFilter(category) }
                data-testid={ `${category}-category-filter` }
              >
                {category}
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
    </div>
  );
}

export default Foods;
