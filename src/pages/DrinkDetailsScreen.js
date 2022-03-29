import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchCocktailById } from '../services/fetchCocktail';

export default function DrinkDetailsScreen() {
  const [drinkDetails, setDrinkDetails] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const history = useHistory();
  const drinkPathArr = history.location.pathname.split('/');
  const drinkId = drinkPathArr[drinkPathArr.length - 1];

  const getInitialData = useCallback(async () => {
    const drinkData = await fetchCocktailById(drinkId); // trocar id fixo pelo da url;
    let ingredients = Object.entries(drinkData).reduce((acc, data) => {
      if (data[0].includes('strIngredient') && data[1]) {
        acc = [...acc, data];
        return acc;
      } return acc;
    }, []);
    if (!ingredients) ingredients = ['nothing'];
    setIngredientList(ingredients);
    setDrinkDetails(drinkData);
  }, [drinkId]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  return (
    <main>
      {console.log('ingredientssssss', ingredientList) }
      <h1 data-testid="recipe-title">
        { drinkDetails.strDrink ?? drinkDetails.strGlass }
      </h1>
      <h3 data-testid="recipe-category">
        { drinkDetails.strCategory }
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
          src={ `${drinkDetails.strDrinkThumb}/preview` }
          alt={ `${drinkDetails.strDrink ?? drinkDetails.strGlass} preview` }
          data-testid="recipe-photo"
        />
      </div>

      <div>
        <ol>
          INGREDIENTES:
          { ingredientList.map((ingredient, index) => (
            <li key={ ingredient } data-testid={ `${index}-ingredient-name-and-measure` }>
              { console.log(`${index}-ingredient-name-and-measure`) }
              {ingredient[1]}
            </li>
          )) }
        </ol>
        <p data-testid="instructions">
          { drinkDetails.strInstructions }
        </p>
      </div>

      <div>
        <object
          data={ drinkDetails.strVideo }
          data-testid="video"
        >
          { `${drinkDetails.strGlass} prep video isn't disponible` }
        </object>
      </div>

      <div data-testid={ `${0}-recomendation-card` }>
        Receitas recomendadas:
      </div>

      <button type="button" data-testid="start-recipe-btn"> Iniciar receita</button>
    </main>
  );
}
