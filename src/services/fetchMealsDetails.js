export const fetchMealsDetails = async (type) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`);
  const response = await request.json();
  return response;
};

export const fetchMealById = async (foodId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  try {
    const response = await fetch(url);
    const mealDetails = await response.json();
    return mealDetails.meals[0];
  } catch (error) {
    return error;
  }
};

export const fetchRecomendedMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(url);
    const mealDetails = await response.json();
    return mealDetails.meals;
  } catch (error) {
    return error;
  }
};

export const fetchMealsBySelectedCategory = async (selectedCategory) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
  try {
    const response = await fetch(url);
    const mealDetails = await response.json();
    return mealDetails.meals;
  } catch (error) {
    return error;
  }
};
