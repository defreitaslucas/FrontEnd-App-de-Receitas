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

export const fetchRandomMeal = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const mealData = await response.json();
  return mealData.meals[0];
};

export const fetchMealByArea = async (area) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const response = await fetch(url);
  const mealsData = await response.json();
  return mealsData.meals;
};
