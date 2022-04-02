import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import shareIcon from '../images/shareIcon.svg';
import { checkRecipeFavoritness, getFavoriteRecipes,
  removeFavoriteRecipeById } from '../helpers/localStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './FavoriteRecipesScreen.css';

const FAV_RECIPES_BTN_CLASSNAME = 'favorite-btn';

function FavoriteRecipes() {
  const [refFavoriteRecipesList, setRefFavoriteRecipes] = useState([]);
  const [toRenderFavoriteRecipesList, setToRenderFavoriteRecipes] = useState([]);

  useEffect(() => {
    const currentFavoriteRecipes = getFavoriteRecipes();
    setRefFavoriteRecipes(currentFavoriteRecipes);
    setToRenderFavoriteRecipes(currentFavoriteRecipes);
  }, [setRefFavoriteRecipes]);

  const handleShareButtonClick = ({ currentTarget }, url) => {
    navigator.clipboard.writeText(url);
    currentTarget.classList.toggle('popUp-container');
  };

  const addFilter = (filterType) => {
    const filteredArray = refFavoriteRecipesList
      .filter(({ type: recipeType }) => recipeType === filterType);
    setToRenderFavoriteRecipes(filteredArray);
  };

  const removeFilter = () => {
    setToRenderFavoriteRecipes(refFavoriteRecipesList);
  };

  const verifyTags = (tag) => {
    if (!tag) return [];
    if (typeof tag === 'string') return [tag];
    return tag;
  };

  const handleFavBtnClick = ({ currentTarget }, id) => {
    if (currentTarget.className.includes(FAV_RECIPES_BTN_CLASSNAME)) {
      removeFavoriteRecipeById(id);
      setRefFavoriteRecipes(refFavoriteRecipesList
        .filter(({ id: recipeId }) => recipeId !== id));
      setToRenderFavoriteRecipes(toRenderFavoriteRecipesList
        .filter(({ id: recipeId }) => recipeId !== id));
    }
    // ~~~~~~ Essa tela por hora, devido aos testes, exige que a tela seja removida caso o favorito seja desmarcado, considerando a possibilidade de um toque não proposital no desfavoritar, em especial no celular, acho valido criar um botão que irá aparecer após desfavoritar a recita e esse sim irá remover a receita da tela de imediato sem precisar atualizar;
    currentTarget.classList.toggle(FAV_RECIPES_BTN_CLASSNAME);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
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
        toRenderFavoriteRecipesList.map((recipe, index) => (
          (
            <div key={ index }>
              {console.log(recipe)}
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ (event) => handleFavBtnClick(event, recipe.id) }
                src={ checkRecipeFavoritness(recipe.id) ? blackHeart : whiteHeart }
                className={ checkRecipeFavoritness(recipe.id)
                  ? FAV_RECIPES_BTN_CLASSNAME : '' }
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

export default FavoriteRecipes;
