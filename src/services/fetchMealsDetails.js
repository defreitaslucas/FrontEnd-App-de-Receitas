const fetchMealsDetails = async (type) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`);
  const response = await request.json();
  return response;
};

export default fetchMealsDetails;
