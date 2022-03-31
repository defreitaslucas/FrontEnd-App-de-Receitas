import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchRecomendedDrinks } from '../services/fetchCocktail';
import { fetchMealById } from '../services/fetchMealsDetails';
import { checkRecipeFavoritness, checkRecipeProgress,
  saveFavoriteRecipe } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './DetailsScreen.css';

const MAGIC_NUMBER_SIX = 6;

export default function FoodDetailsScreen(props) {
  const [foodDetails, setFoodDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [id, setId] = useState('');
  const [recomendation, setRecomendations] = useState([]);
  const [recipeProgress, setRecipeProgress] = useState('new');
  const [isFavorite, setIsFavorite] = useState(false);

  const { match: { params: { recipeId } } } = props;

  const getInitialData = useCallback(async () => {
    const foodData = await fetchMealById(id);
    const ingredientsArr = Object.entries(foodData).filter(([key, value]) => (key
      .includes('strIngredient') && value));
    const measuresArr = Object.entries(foodData).filter(([key, value]) => (key
      .includes('strMeasure') && value));
    const ingredients = ingredientsArr.reduce((acc, data, index) => {
      acc = [...acc, `${data[1]} ${measuresArr[index][1]}`];
      return acc;
    }, []);
    setIngredientList(ingredients);
    setFoodDetails(foodData);
    setId(recipeId);

    const recomendedDrinks = await fetchRecomendedDrinks();
    setRecomendations(recomendedDrinks);

    setRecipeProgress(checkRecipeProgress(recipeId, 'meals'));
    setIsFavorite(checkRecipeFavoritness(recipeId));
  }, [id, recipeId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleStartButtonClick = () => {
    const { history: { push } } = props;
    push(`/foods/${id}/in-progress`);
  };

  const handleShareButtonClick = ({ currentTarget }) => {
    const { location: { pathname } } = props;
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    currentTarget.classList.toggle('popUp-container');
  };

  const handleFavBtnClick = () => {
    setIsFavorite(!isFavorite);
    const { strArea: nationality, strCategory: category,
      strMeal: name, strMealThumb } = foodDetails;
    const image = `${strMealThumb}/preview`;
    const newObj = {
      id,
      type: 'food',
      nationality,
      category,
      alcoholicOrNot: '',
      name,
      image };
    saveFavoriteRecipe({ ...newObj });
  };

  return (
    <main>
      <h1 data-testid="recipe-title">
        { foodDetails.strMeal }
      </h1>
      <h3 data-testid="recipe-category">
        { foodDetails.strCategory }
      </h3>

      <nav>
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
      </nav>

      <div>
        <img
          src={ `${foodDetails.strMealThumb}/preview` }
          alt={ `${foodDetails.strMeal} preview` }
          data-testid="recipe-photo"
        />
      </div>

      <div>
        <ol className="ingredients-container">
          INGREDIENTES:
          { ingredientList.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </li>
          )) }
        </ol>
        <p data-testid="instructions" className="instruction-paragraph">
          { foodDetails.strInstructions }
        </p>
      </div>

      <div>
        <object
          data={ foodDetails.strVideo }
          data-testid="video"
        >
          { `${foodDetails.strGlass} prep video isn't disponible` }
        </object>
      </div>

      <div>
        Recomended recipes:
        <div
          className="recomendations-container"
        >
          {recomendation.map(({ idDrink, strDrinkThumb, strDrink }, index) => {
            if (index < MAGIC_NUMBER_SIX) {
              return (
                <div
                  key={ idDrink }
                  className="recomended-iten"
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ `${strDrinkThumb}/preview` }
                    alt={ `${strDrink} recomendation` }
                  />
                  <span data-testid={ `${index}-recomendation-title` }>
                    { strDrink }
                  </span>
                </div>
              );
            } return null;
          })}
        </div>
      </div>

      {recipeProgress === 'done'
        ? 'Nice Job!!'
        : (
          <button
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
            name="Start Recipe"
            onClick={ handleStartButtonClick }
          >
            { recipeProgress === 'new' ? 'Start Recipe' : 'Continue Recipe' }
          </button>)}
    </main>
  );
}

FoodDetailsScreen.propTypes = {
  recipeId: PropTypes.string.isRequired,
}.isRequired;
