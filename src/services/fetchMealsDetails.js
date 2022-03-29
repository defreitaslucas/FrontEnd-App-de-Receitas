export const fetchMealsDetails = async (type) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`);
  const response = await request.json();
  return response;
};

export const fetchMealById = async (foodId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  try {
    const response = await fetch(url);
    const foodDetails = await response.json();
    console.log('details', foodDetails.meals[0]);
    return foodDetails.meals[0];
  } catch (error) {
    return error;
  }
};

// www.themealdb.com/api/json/v1/1/lookup.php?i=52772;
