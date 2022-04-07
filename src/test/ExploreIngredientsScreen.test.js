import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

import fetch from '../../cypress/mocks/fetch';

const EXPLORE_FOOD_INGREDIENTS_PATH = '/explore/foods/ingredients';
const EXPLORE_DRINK_INGREDIENTS_PATH = '/explore/drinks/ingredients';
const INGREDIENT_CARD = '0-ingredient-card';
const INGREDIENT_IMAGE = '0-card-img';
const INGREDIENT_NAME = '0-card-name';

describe('Testing the Explore Recipes Screen', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetch(url));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it(`75 & 76 - Check if there are all the basic components
    - ingredient card, card img and card name`, async () => {
    const { history, findByTestId, findByText } = renderWithRouter(<App />);
    history.push(EXPLORE_FOOD_INGREDIENTS_PATH);
    expect(await findByTestId(INGREDIENT_CARD)).toBeInTheDocument();
    expect(await findByTestId(INGREDIENT_IMAGE)).toBeInTheDocument();
    expect(await findByTestId(INGREDIENT_NAME)).toBeInTheDocument();

    history.push(EXPLORE_DRINK_INGREDIENTS_PATH);
    const i = await findByText(/drink/ig); // gambiarra para compensar a falta do waitFor
    console.log(i.aaaaa);
    expect(await findByTestId(INGREDIENT_CARD)).toBeInTheDocument();
    expect(await findByTestId(INGREDIENT_NAME)).toBeInTheDocument();
    expect(await findByTestId(INGREDIENT_IMAGE)).toBeInTheDocument();
  });

  it(`77 - Check if the Card click is redirecting correctly
    to the main screen filtered by the selected ingredient`, async () => {
    const { history, findByTestId, findAllByTestId } = renderWithRouter(<App />);
    // !!!!!!! O render está fazendo 4 fetchs; verificar se são todos necessários e se o uso de "memo" resolve isso.
    global.fetch.mockClear();
    history.push(EXPLORE_DRINK_INGREDIENTS_PATH);
    let ingredientCard = await findByTestId(INGREDIENT_NAME);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    userEvent.click(ingredientCard);

    let allRecipes = await findAllByTestId(/recipe-card/ig);
    let allRecipesIds = allRecipes
      .map((recipe) => (Object.values(recipe)[1].href).split('/')[2]);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
    allRecipesIds.forEach((id, index) => {
      expect(id).toBe(drinksByIngredient.drinks[index].idDrink);
    });

    history.push(EXPLORE_FOOD_INGREDIENTS_PATH);
    ingredientCard = await findByTestId(INGREDIENT_NAME);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    userEvent.click(ingredientCard);

    allRecipes = await findAllByTestId(/recipe-card/ig);
    allRecipesIds = allRecipes
      .map((recipe) => (Object.values(recipe)[1].href).split('/')[2]);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
    expect(global.fetch).toHaveBeenCalledTimes(+'4');

    allRecipesIds.forEach((id, index) => {
      if (index < +'10') expect(id).toBe(mealsByIngredient.meals[index].idMeal);
    });
  });
});
