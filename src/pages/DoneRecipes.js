import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Header from '../component/Header';
import shareIcon from '../images/shareIcon.svg';
import { getDoneRecipes } from '../helpers/localStorage';
import './DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const { renderedDoneRecipesList, setDoneRecipes } = useContext(MyContext);

  useEffect(() => {
    const currentDoneRecipes = getDoneRecipes();
    setDoneRecipes((prevState) => ({
      ...prevState,
      doneRecipes: currentDoneRecipes,
      renderedDoneRecipesList: currentDoneRecipes,
    }));
  }, [setDoneRecipes]);

  const handleShareButtonClick = ({ currentTarget }, url) => {
    copy(url);
    currentTarget.classList.toggle('popUp-container');
  };

  const addFilter = (type) => {
    setDoneRecipes((prevState) => {
      let newDoneRecipesList = [...prevState.doneRecipes];
      if (type === 'drink') {
        newDoneRecipesList = newDoneRecipesList.filter((el) => el.type === 'drink');
        return ({
          ...prevState,
          renderedDoneRecipesList: newDoneRecipesList,
        });
      }
      newDoneRecipesList = newDoneRecipesList.filter((el) => el.type === 'food');
      return ({
        ...prevState,
        renderedDoneRecipesList: newDoneRecipesList,
      });
    });
  };

  const removeFilter = () => {
    const currentDoneRecipes = getDoneRecipes();
    setDoneRecipes((prevState) => {
      const newDoneRecipesList = [...currentDoneRecipes];
      return ({
        ...prevState,
        renderedDoneRecipesList: newDoneRecipesList,
      });
    });
  };

  const verifyTags = (tag) => {
    if (!tag) return [];
    if (typeof tag === 'string') return [tag];
    return tag;
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        type="button"
        onClick={ removeFilter }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        onClick={ () => addFilter('food') }
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        onClick={ () => addFilter('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        renderedDoneRecipesList.map((recipe, index) => (
          (
            <div key={ index }>
              <Link
                to={ (recipe.type === 'food')
                  ? `/foods/${recipe.id}`
                  : `/drinks/${recipe.id}` }
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { (recipe.type === 'food')
                  ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot }
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                { recipe.doneDate }
              </p>
              {
                verifyTags(recipe.tags).map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                ))
              }
              <div className="popUp-container">
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ (recipe.type === 'food')
                    ? (event) => handleShareButtonClick(event, `http://localhost:3000/foods/${recipe.id}`)
                    : (event) => handleShareButtonClick(event, `http://localhost:3000/drinks/${recipe.id}`) }
                />
                <span>Link copied!</span>
              </div>
            </div>
          )
        ))
      }
    </div>
  );
}

export default DoneRecipes;
