import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCocktailById } from '../services/fetchCocktail';
import { fetchRecomendedMeals } from '../services/fetchMealsDetails';
import { checkRecipeFavoritness, checkRecipeProgress,
  saveFavoriteRecipe } from '../helpers/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './Styles/DetailScreen.css';

const MAGIC_NUMBER_SIX = 6;

export default function DrinkDetailsScreen(props) {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [id, setId] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [recipeProgress, setRecipeProgress] = useState('new');
  const [isFavorite, setIsFavorite] = useState(false);

  const { match: { params: { recipeId } } } = props;

  const getInitialData = useCallback(async () => {
    const drinkData = await fetchCocktailById(id);
    const ingredientsArr = Object.entries(drinkData).filter(([key, value]) => (key
      .includes('strIngredient') && value));
    const ingredients = ingredientsArr.reduce((acc, data, index) => {
      acc = [...acc, `${data[1]} ${drinkData['strMeasure'.concat([index + 1])]}`];
      return acc;
    }, []);
    setIngredientList(ingredients);
    setDrinkDetails(drinkData);
    setId(recipeId);

    const recomendedMeals = await fetchRecomendedMeals();
    setRecomendations(recomendedMeals);

    setRecipeProgress(checkRecipeProgress(recipeId, 'cocktails'));

    setIsFavorite(checkRecipeFavoritness(recipeId));
  }, [id, recipeId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const handleStartButtonClick = () => {
    const { history: { push } } = props;
    push(`/drinks/${id}/in-progress`);
  };

  const handleShareButtonClick = ({ currentTarget }) => {
    const { location: { pathname } } = props;
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    currentTarget.classList.toggle('popUp-container');
  };

  const handleFavBtnClick = () => {
    setIsFavorite(!isFavorite);
    const { strCategory: category, strDrink: name,
      strDrinkThumb, strAlcoholic } = drinkDetails;
    const image = strDrinkThumb;
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

  return (
    <main className="detail-screen-container">
      <div className="detail-screen-container--title">
        <h1 data-testid="recipe-title">
          { drinkDetails.strDrink ?? drinkDetails.strGlass }
        </h1>
        <h3 data-testid="recipe-category">
          {drinkDetails.strAlcoholic}
          { drinkDetails.strCategory }
        </h3>
      </div>

      <nav className="detail-screen-container--like">
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
            src={ isFavorite ? blackHeart : whiteHeart }
            alt="a filld heart. click to unfavorite and favorite this recipe"
            className={ isFavorite ? 'favorited' : 'no-favorited' }
          />
        </button>
      </nav>

      <div className="detail-screen--recipe">
        <div>
          <img
            src={ `${drinkDetails.strDrinkThumb}/preview` }
            alt={ `${drinkDetails.strDrink ?? drinkDetails.strGlass} preview` }
            data-testid="recipe-photo"
          />
        </div>

        <div>
          <h5 style={ { fontWeight: '800' } }>INGREDIENTS:</h5>
          <ol className="details-screen--overflow-container">
            { ingredientList.map((ingredient, index) => (
              <li
                className="ingredients-container"
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            )) }
          </ol>
          <div>
            <h5 style={ { fontWeight: '800' } }>INSTRUCTIONS:</h5>
            <p
              data-testid="instructions"
              className="instruction-paragraph details-screen--overflow-container"
            >
              { drinkDetails.strInstructions }
            </p>
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
      </div>
      <div className="detail-screen--recomended-recipes">
        <h5>
          Recomended recipes:
        </h5>
        <div
          className="recomendations-container"
        >
          {recomendations.map(({ idMeal, strMealThumb, strMeal }, index) => (
            index < MAGIC_NUMBER_SIX && (
              <Link to={ `/foods/${idMeal}` }>
                <div
                  className="recomended-iten"
                  key={ idMeal }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ `${strMealThumb}/preview` }
                    alt={ `${strMeal} recomendation` }
                  />
                  <span
                    data-testid={ `${index}-recomendation-title` }
                    style={ { color: 'white' } }
                  >
                    { strMeal }
                  </span>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>

    </main>
  );
}

DrinkDetailsScreen.propTypes = {
  recipeId: PropTypes.string.isRequired,
}.isRequired;
