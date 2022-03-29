export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'))
  || [];

export const getInProgressRecipes = () => JSON.parse(localStorage
  .getItem('inProgressRecipes')) || { cocktails: '', meals: '' };

export const getFavoriteRecipes = () => JSON
  .parse(localStorage.getItem('favoriteRecipes')) || [];

export const checkRecipeProgress = (recipeID, type) => {
  try {
    const inProgressRecipes = Object.keys(getInProgressRecipes()[type]);
    const doneRecipes = getDoneRecipes();
    if (inProgressRecipes.some((id) => id === recipeID)) return 'inProgress';
    if (doneRecipes.some(({ id }) => id === recipeID)) return 'done';
    return 'new';
  } catch (error) {
    return 'new';
  }
};

export const saveFavoriteRecipe = (recipeData) => {
  const currentFavorites = getFavoriteRecipes();
  const newFavorites = [...currentFavorites, { ...recipeData }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const checkRecipeFavoritness = (recipeID) => {
  const favoriteRecipes = getFavoriteRecipes();
  // console.log('AAAAAAAAAAA', favoriteRecipes[0]);
  if (favoriteRecipes.some(({ id }) => id === recipeID)) return true;
  return false;
};
