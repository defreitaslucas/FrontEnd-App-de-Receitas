export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'))
  || [];

export const getInProgressRecipes = () => JSON.parse(localStorage
  .getItem('inProgressRecipes')) || { cocktails: '', meals: '' };

export const getFavoriteRecipes = () => JSON
  .parse(localStorage.getItem('favoriteRecipes')) || [];

export const getUserData = () => JSON.parse(localStorage.getItem('user')) || '';

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

export const removeFavoriteRecipeById = (recipeId) => {
  const currentFavorites = getFavoriteRecipes();
  const filteredFavorites = currentFavorites.filter(({ id }) => id !== recipeId);
  const newFavorites = [...filteredFavorites]; // !!!! linha desnecessária, eu acho
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const removeFavoriteRecipeByType = (recipeType) => {
  const currentFavorites = getFavoriteRecipes();
  const filteredFavorites = currentFavorites.filter(({ type }) => type === recipeType);
  const newFavorites = [...filteredFavorites];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const checkRecipeFavoritness = (recipeID) => {
  const favoriteRecipes = getFavoriteRecipes();
  if (favoriteRecipes.some(({ id }) => id === recipeID)) return true;
  return false;
};

export const getRecipeIngredients = (id, type) => {
  const inProgressRecipes = getInProgressRecipes()[type];
  console.log(inProgressRecipes);
  const inProgressRecipesIds = Object.keys(getInProgressRecipes()[type]);
  const verifyRecipeId = inProgressRecipesIds.find((itemId) => itemId === id);
  if (verifyRecipeId) return inProgressRecipes[id];
  return [];
};

export const saveDoneRecipe = (recipeData) => {
  const currentDoneRecipes = getDoneRecipes();
  const newDoneRecipes = [...currentDoneRecipes, { ...recipeData }];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
};
