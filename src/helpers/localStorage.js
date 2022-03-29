export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes'))
  || [];

export const getInProgressRecipes = () => JSON.parse(localStorage
  .getItem('inProgressRecipes')) || { cocktails: '', meals: '' };

export const verifyRecipeProgress = (recipeID, type) => {
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
