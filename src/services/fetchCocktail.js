export const fetchCocktailDetails = async (type) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${type}=list`);
  const response = await request.json();
  return response;
};

export const fetchCocktailById = async (cocktailId) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
  try {
    const response = await fetch(url);
    const drinkDetails = await response.json();
    return drinkDetails.drinks[0];
  } catch (error) {
    return error;
  }
};

export const fetchRecomendedDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(url);
    const drinkDetails = await response.json();
    return drinkDetails.drinks;
  } catch (error) {
    return error;
  }
};

export const fetchRandomCocktail = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const drinkData = await response.json();
  return drinkData.drinks[0];
};
