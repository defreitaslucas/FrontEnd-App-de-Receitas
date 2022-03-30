import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../component/Header';
import Clipboard from '../component/Clipboard';
import searchIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const history = useHistory();
  const { doneRecipesList, setDoneRecipesList } = useContext(MyContext);

  function addFilter(type) {
    setDoneRecipesList((prevState) => {
      let newDoneRecipesList = [...doneRecipesList];
      if (type === 'foods') {
        newDoneRecipesList = newDoneRecipesList.filter();
        return ({
          ...prevState,
          renderedDoneRecipesList: newDoneRecipesList,
        });
      }
      if (type === 'drinks') {
        newDoneRecipesList = newDoneRecipesList.filter();
        return ({
          ...prevState,
          renderedDoneRecipesList: newDoneRecipesList,
        });
      }
    });
  }

  function removeFilter() {
    setFoods((prevState) => ({
      ...prevState,
      renderedDoneRecipesList: doneRecipesList,
    }));
  }

  return (
    <div>
      <Header title="Recipes Made" />
      <button
        type="button"
        onClick={ removeFilter }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => addFilter('foods') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ () => addFilter('drinks') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        (doneRecipesList.length > 0)
          ? (
            doneRecipesList.map((recipe, index) => (
              (history.location.pathname.includes('foods'))
                ? (
                  <div key={ index }>
                    <Link to={ `/foods/${recipe.idMeal}` }>
                      <img
                        src={ recipe.strMealThumb }
                        alt={ recipe.strMeal }
                        data-testid={ `${index}-horizontal-image` }
                      />
                      <p data-testid={ `${index}-horizontal-name` }>
                        { recipe.strMeal }
                      </p>
                    </Link>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { recipe.strCategory }
                    </p>
                    <p>{ recipe.strArea }</p>
                    <p data-testid={ `${index}-horizontal-done-date` }>
                      Data em que a receita foi feita
                    </p>
                    {
                      recipe.strTags.split(',').filter((_el, i) => i < 2)
                        .map((tagName, i) => (
                          <p
                            key={ i }
                            data-testid={ `${i}-${tagName}-horizontal-tag` }
                          >
                            { tagName }
                          </p>
                        ))
                    }
                    <Clipboard
                      textToCopy={ `http://localhost${history.location.pathname}` }
                      image={ searchIcon }
                      name={ recipe.strMeal }
                      data-testid={ `${index}-horizontal-share-btn` }
                    >
                      Compartilhar a receita
                    </Clipboard>
                  </div>
                )
                : (
                  <div key={ index }>
                    <Link to={ `/drinks/${recipe.idDrink}` }>
                      <img
                        src={ recipe.strDrinkThumb }
                        alt={ recipe.strDrink }
                        data-testid={ `${index}-horizontal-image` }
                      />
                      <p data-testid={ `${index}-horizontal-name` }>
                        { recipe.strDrink }
                      </p>
                    </Link>
                    <p>{ recipe.strAlcoholic }</p>
                    <p data-testid={ `${index}-horizontal-done-date` }>
                      Data em que a receita foi feita
                    </p>
                    <Clipboard
                      textToCopy={ `http://localhost${history.location.pathname}` }
                      image={ searchIcon }
                      name={ recipe.strDrink }
                      data-testid={ `${index}-horizontal-share-btn` }
                    >
                      Compartilhar a receita
                    </Clipboard>
                  </div>
                )
            ))
          )
          : null
      }
    </div>
  );
}

export default DoneRecipes;
