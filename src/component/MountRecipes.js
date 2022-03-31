import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import '../pages/DetailsScreen.css';
import './recipeInProgress.css';
import { getRecipeIngredients } from '../helpers/localStorage';
import checkPath from '../helpers';

function MountRecipes(props) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const isFood = checkPath(pathname);
  const { recipesInProgress } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [arrayDrinkAndMeal, setDrinkAndMeal] = useState([]);
  const [didMount, setDidMount] = useState(false);
  const { idRecipes: { recipeId } } = props;

  const handleShareButtonClick = ({ currentTarget }) => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    currentTarget.classList.toggle('popUp-container');
  };

  const handleFavBtnClick = () => {
    setIsFavorite(!isFavorite);
    const { strCategory: category, strDrink: name,
      strDrinkThumb, strAlcoholic } = drinkDetails;
    const image = `${strDrinkThumb}/preview`;
    const newObj = {
      id,
      type: 'drink',
      nationality: '',
      category,
      alcoholicOrNot: (strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'non-alcoholic'),
      name,
      image };
    saveFavoriteRecipe({ ...newObj });
  };

  const saveLocalStorage = useCallback(() => {
    const obj = {
      cocktails: {
      },
      meals: {
      },
    };
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'))
      ?? obj;
    if (didMount) getLocalStorage[isFood][recipeId] = [...arrayDrinkAndMeal];
    localStorage.setItem('inProgressRecipes', JSON.stringify(getLocalStorage));
  }, [arrayDrinkAndMeal, pathname, recipeId, isFood]);

  useEffect(() => {
    const ingredientsArr = Object.entries(recipesInProgress[0])
      .filter(([key, value]) => (key
        .includes('strIngredient') && value));
    const measuresArr = Object.entries(recipesInProgress[0])
      .filter(([key, value]) => (key
        .includes('strMeasure') && value));
    const ingredients = ingredientsArr.reduce((acc, data, index) => {
      acc = [...acc, `${data[1]} ${measuresArr[index][1]}`];
      return acc;
    }, []);
    setDrinkAndMeal(getRecipeIngredients(recipeId, isFood));
    setIngredientList(ingredients);
    setDidMount(true);
  }, [recipesInProgress]);

  useEffect(() => {
    saveLocalStorage();
  }, [saveLocalStorage]);

  const handleClicked = ({ currentTarget }) => {
    currentTarget.classList.toggle('clicked');
  };

  const checkedNameStorage = ({ target }) => {
    const { name, checked } = target;
    if (checked) {
      const valueChecked = name;
      setDrinkAndMeal((prevState) => ([
        ...prevState,
        valueChecked,
      ]));
    } else {
      const noChecked = arrayDrinkAndMeal.filter((item) => item !== name);
      setDrinkAndMeal(noChecked);
    }
  };

  return (
    <div>
      {
        recipesInProgress && recipesInProgress.map((item) => (
          <div key={ item.idDrink || item.idMeal }>
            <img
              src={ item.strDrinkThumb || item.strMealThumb }
              alt="Foto Drink"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{item.strDrink || item.strMeal}</h2>
            <h3 data-testid="recipe-category">
              {item.strAlcoholic}
              {' '}
              {item.strCategory }
            </h3>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShareButtonClick }
              className="popUp-container"
            >
              <span className="popUp">Link copied!</span>
              <img src={ shareIcon } alt="share button" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavBtnClick }
              src={ isFavorite ? blackHeart : whiteHeart }
              className={ isFavorite ? 'favorite-btn' : '' }
            >
              <img
                src={ whiteHeart }
                alt="a empty heart. click to favorite this recipe"
                className="no-favorited"
              />
              <img
                src={ blackHeart }
                alt="a filld heart. click to unfavorite this recipe"
                className="favorited"
              />
            </button>
            <ol>
              INGREDIENTES:
              { ingredientList.map((ingredient, index) => (
                <div key={ ingredient }>
                  <label
                    htmlFor={ ingredient }
                    // onChange={ handleClicked }
                    className={ arrayDrinkAndMeal.includes(ingredient) ? 'clicked' : '' }
                  >
                    <li
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        name={ ingredient }
                        id={ ingredient }
                        onClick={ (event) => {
                          checkedNameStorage(event);
                          handleClicked(event);
                        } }
                        checked={ arrayDrinkAndMeal.includes(ingredient) }
                      />
                      {ingredient}
                    </li>
                  </label>
                </div>
              )) }
            </ol>
            <p data-testid="instructions">
              { item.strInstructions }
            </p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/') }
            >
              Finalizar Receita
            </button>
          </div>
        ))
      }
    </div>
  );
}

MountRecipes.propTypes = {
  idRecipes: PropTypes.shape({
    recipeId: PropTypes.string,
  }).isRequired,
  recipesInProgress: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MountRecipes;
