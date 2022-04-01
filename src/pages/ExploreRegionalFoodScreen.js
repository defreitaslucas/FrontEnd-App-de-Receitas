import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMealByArea, fetchMealsDetails } from '../services/fetchMealsDetails';
import FooterMenu from '../component/FooterMenu';
import MyContext from '../context/MyContext';
import './ExploreIngredientsScreen.css';
import Header from '../component/Header';

export default function ExploreRegionalFoodScreen() {
  const { foodsList } = useContext(MyContext);

  const [nationalities, setNationalities] = useState([]);
  const [foodByNationality, setFoodByNationality] = useState([]);

  const setInitialData = useCallback(async () => {
    const nationalitiesList = await fetchMealsDetails('a');
    setNationalities(nationalitiesList.meals);
    setFoodByNationality(foodsList);
  }, [foodsList]);

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  // const addFilter = (category) => {
  //   setFoods((prevState) => {
  //     if (category === selectedFoodsCategory) {
  //       return ({
  //         ...prevState,
  //         selectedCategory: '',
  //       });
  //     }
  //     return ({
  //       ...prevState,
  //       selectedCategory: category,
  //     });
  //   });
  // };

  const addNationalityFilter = async (area) => {
    if (area) {
      const mealsByArea = await fetchMealByArea(area);
      setFoodByNationality(mealsByArea);
    } else {
      setFoodByNationality(foodsList);
    }
  };

  return (
    <main>
      <Header title="Explore Nationalities" />
      <h1>
        FOODS BY REGION
      </h1>
      <nav>
        <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ ({ target }) => addNationalityFilter(target.value) }
        >
          <option data-testid="All-option" value=""> All </option>
          {
            nationalities.map(({ strArea }) => (
              <option
                key={ strArea }
                value={ strArea }
                data-testid={ `${strArea}-option` }
              >
                { strArea }
              </option>
            ))
          }
        </select>
        {/* <select
          data-testid="explore-by-nationality-dropdown"
          onChange={ ({ target }) => addFilter(target.value) }
        >
          {
            (foodsCategories.length > 0)
              ? (
                foodsCategories.map((category) => (
                  <option
                    key={ category }
                    type="button"
                    onClick={ () => addFilter(category) }
                    data-testid={ `${category}-category-filter` }
                    value={ category }
                  >
                    {category}
                  </option>
                ))
              )
              : null
          }
        </select> */}
      </nav>
      <section>
        {
          (foodsList.length > 0)
            ? (
              foodByNationality.map(({ strMealThumb, strMeal, idMeal }, index) => {
                if (index < +'12') {
                  return (
                    <div key={ index }>
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
                      <Link
                        to={ `/foods/${idMeal}` }
                        data-testid={ `${index}-recipe-card` }
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  );
                } return null;
              })
            )
            : null
        }
      </section>
      <FooterMenu />
    </main>
  );
}

ExploreRegionalFoodScreen.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
