import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMealById } from '../services/fetchMealsDetails';

export default function FoodDetailsScreen() {
  const [foodDetails, setFoodDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [id, setId] = useState('');
  const history = useHistory();
  const foodPathArr = history.location.pathname.split('/');
  const foodId = foodPathArr[foodPathArr.length - 1];

  const getInitialData = useCallback(async () => {
    const foodData = await fetchMealById(id);
    const ingredientsArr = Object.entries(foodData).filter(([key, value]) => (key
      .includes('strIngredient') && value));
    const measuresArr = Object.entries(foodData).filter(([key, value]) => (key
      .includes('strMeasure') && value));
    const ingredients = ingredientsArr.reduce((acc, data, index) => {
      acc = [...acc, `${data[1]} ${measuresArr[index][1]}`];
      return acc;
    }, []);
    setIngredientList(ingredients);
    setFoodDetails(foodData);
    setId(foodId);
  }, [id, foodId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <main>
      <h1 data-testid="recipe-title">
        { foodDetails.strMeal }
      </h1>
      <h3 data-testid="recipe-category">
        { foodDetails.strCategory }
      </h3>

      <nav>
        <button type="button" data-testid="share-btn">
          share
        </button>
        <button type="button" data-testid="favorite-btn">
          favorite
        </button>
      </nav>

      <div>
        <img
          src={ `${foodDetails.strMealThumb}/preview` }
          alt={ `${foodDetails.strMeal} preview` }
          data-testid="recipe-photo"
        />
      </div>

      <div>
        <ol>
          INGREDIENTES:
          { ingredientList.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </li>
          )) }
        </ol>
        <p data-testid="instructions">
          { foodDetails.strInstructions }
        </p>
      </div>

      <div>
        <object
          data={ foodDetails.strVideo }
          data-testid="video"
        >
          { `${foodDetails.strGlass} prep video isn't disponible` }
        </object>
      </div>

      <div data-testid={ `${0}-recomendation-card` }>
        Receitas recomendadas:
      </div>

      <button type="button" data-testid="start-recipe-btn"> Iniciar receita</button>
    </main>
  );
}
