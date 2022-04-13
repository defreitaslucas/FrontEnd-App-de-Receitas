import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import {
  getRecipeIngredients, saveFavoriteRecipe, getFavoriteRecipes,
  removeFavoriteRecipeById, removeFavoriteRecipeByType, saveDoneRecipe,
} from '../helpers/localStorage';
import './Styles/MountRecipes.css';
import { checkPath } from '../helpers';

const copy = require('clipboard-copy');

export default function MountRecipes(props) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const isFood = checkPath(pathname);
  const { recipesInProgress } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [arrayDrinkAndMeal, setDrinkAndMeal] = useState([]);
  const [didMount, setDidMount] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { idRecipes: { recipeId } } = props;

  const handleShareButtonClick = ({ currentTarget }) => {
    const newPathname = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${newPathname}`);
    currentTarget.classList.toggle('popUp-container');
  };
  const handleFavBtnClick = (item) => {
    setIsFavorite(!isFavorite);
    if (pathname.includes('drinks')) {
      const { idDrink: id, strCategory: category, strDrink: name,
        strDrinkThumb: image, strAlcoholic } = item;
      const newObj = { id,
        type: 'drink',
        nationality: '',
        category,
        alcoholicOrNot: (strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'non-alcoholic'),
        name,
        image };
      if (favoriteRecipes.some((el) => el.id === id)) {
        removeFavoriteRecipeById(id);
      } else {
        saveFavoriteRecipe({ ...newObj });
      }
    }
    const { idMeal: id, strArea: nationality, strCategory: category,
      strMeal: name, strMealThumb: image } = item;
    const newObj = { id,
      type: 'food',
      nationality,
      category,
      alcoholicOrNot: '',
      name,
      image };
    if (favoriteRecipes.some((el) => el.id === id)) {
      removeFavoriteRecipeById(id);
    } else {
      saveFavoriteRecipe({ ...newObj });
    }
  };
  const saveLocalStorage = useCallback(() => {
    const obj = { cocktails: {}, meals: {} };
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
    if (pathname.includes('drinks')) {
      removeFavoriteRecipeByType('drink');
    } else {
      removeFavoriteRecipeByType('food');
    }
    setFavoriteRecipes(getFavoriteRecipes());
  }, [recipesInProgress, isFavorite, pathname]);
  useEffect(() => {
    const checkboxes = document.querySelectorAll('[type=checkbox]');
    const checkedCheckboxes = document.querySelectorAll('[type=checkbox]:checked');
    if (checkboxes.length > 0 && checkboxes.length === checkedCheckboxes.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [recipesInProgress, arrayDrinkAndMeal, pathname]);
  useEffect(() => saveLocalStorage(), [saveLocalStorage]);
  const handleClicked = ({ currentTarget }) => currentTarget.classList.toggle('clicked');
  const checkedNameStorage = ({ target }) => {
    const { name, checked } = target;
    if (checked) {
      const valueChecked = name;
      setDrinkAndMeal((prevState) => ([...prevState, valueChecked]));
    } else {
      const noChecked = arrayDrinkAndMeal.filter((item) => item !== name);
      setDrinkAndMeal(noChecked);
    }
  };
  const verifyId = (id) => favoriteRecipes.some((el) => el.id === id);
  const finishRecipe = (recipe) => {
    const today = new Date();
    if (pathname.includes('drinks')) {
      const { strAlcoholic } = recipe;
      const newObj = { id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: (strAlcoholic === 'Alcoholic' ? 'Alcoholic' : 'non-alcoholic'),
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: today,
        tags: recipe.strTags };
      saveDoneRecipe(newObj);
    }
    const newObj = { id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: today,
      tags: recipe.strTags };
    saveDoneRecipe(newObj);
    history.push('/done-recipes');
  };

  return (
    <div>
      {
        recipesInProgress && recipesInProgress.map((item) => (
          <div key={ item.idDrink || item.idMeal }>
            <div>
              <img
                className="recipes-in-progress-img"
                src={ item.strDrinkThumb || item.strMealThumb }
                alt={ item.strDrink || item.strMeal }
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
                className="mount-recipe-btn popUp-container"
              >
                <span className="popUp">Link copied!</span>
                <img src={ shareIcon } alt="share button" />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ () => handleFavBtnClick(item) }
                src={ verifyId(item.idDrink || item.idMeal) ? blackHeart : whiteHeart }
                className={ verifyId(item.idDrink || item.idMeal)
                  ? 'mount-recipe-btn favorite-btn' : 'mount-recipe-btn' }
              >
                <img
                  src={ isFavorite ? blackHeart : whiteHeart }
                  alt="a filld heart. click to unfavorite and favorite this recipe"
                  className={ isFavorite ? 'favorited' : 'no-favorited' }
                />
              </button>
            </div>
            <h3 className="ingredients-title">INGREDIENTS:</h3>
            <ol className="mount-recipes-ingredients mount-recipes-overflow-container">
              { ingredientList.map((ingredient, index) => (
                <div key={ ingredient }>
                  <label
                    htmlFor={ ingredient }
                    className={ arrayDrinkAndMeal.includes(ingredient) ? 'clicked' : '' }
                  >
                    <ul
                      className="input-ul"
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
                    </ul>
                  </label>
                </div>
              )) }
            </ol>
            <h3 className="ingredients-title">INSTRUCTIONS:</h3>
            <p
              className="mount-recipes-overflow-container"
              data-testid="instructions"
            >
              { item.strInstructions }
            </p>
            <button
              className="mount-recipe-btn"
              type="button"
              disabled={ isDisabled }
              data-testid="finish-recipe-btn"
              onClick={ () => finishRecipe(item) }
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
