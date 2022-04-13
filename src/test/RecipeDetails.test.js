import userEvent from '@testing-library/user-event';
import React from 'react';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const FOOD_DETAILS_SCREEN_PATH = '/foods/52771/';
const DRINK_DETAILS_SCREEN_PATH = '/drinks/178319/';
const FAVORITE_BTN_ID = 'favorite-btn';

const mockMeal = oneMeal.meals[0];
const mockDrink = oneDrink.drinks[0];

describe('Testing the Recipe Details Screen', () => {
  const favoriteRecipes = [];

  let mockLocalStorage = { favoriteRecipes: JSON.stringify(favoriteRecipes) };

  copy.mockImplementation((text) => text);

  beforeEach(() => {
    mockLocalStorage = { favoriteRecipes: JSON.stringify(favoriteRecipes) };
    global.Storage.prototype.getItem = jest
      .fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.setItem = jest
      .fn((key, value) => { mockLocalStorage[key] = value; });

    global.fetch = jest.fn((url) => fetch(url));
  });

  // !!!!!!!!!!!!!!!!!! CONSERTAR O LOCALSTORAGE NAS OUTRAS PAGINAS DE TESTES QUE EU FIZ!!!!!

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it(`33, 34 & 35, 36 - Check if there are all the basic components
  in the FOOD details page and if they have the correct value
  - Recipe image, instruction, title,
  share button, favorite button and finish recipe button,
  category, ingredient list`, async () => {
    const { history, getByTestId, getAllByTestId,
      findByRole, getByRole, getAllByRole } = renderWithRouter(<App />);
    jest.clearAllMocks();

    history.push(FOOD_DETAILS_SCREEN_PATH);

    const recipeImage = await findByRole('img',
      { name: new RegExp(mockMeal.strMeal, 'ig') });
    expect(recipeImage)
      .toHaveProperty('src', `${mockMeal.strMealThumb}/preview`);

    const recipeTitles = (
      getAllByRole('heading', { level: 2, name: mockMeal.name })
    ); // aparentemente a propriedade 'level' não existe nessa versão do rtl
    expect(recipeTitles[0]).toHaveTextContent(new RegExp(mockMeal.name, 'ig'));

    const recipeInstruction = getByTestId('instructions');
    expect(recipeInstruction).toHaveTextContent(mockMeal.strInstructions);

    const recipeCategory = recipeTitles[1];
    expect(recipeCategory).toHaveTextContent(mockMeal.strCategory);

    const recipeVideo = getByTestId('video');
    expect(recipeVideo).toBeInTheDocument();

    const shareBtn = getByRole('button', { name: /share button/i });
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = getByTestId(FAVORITE_BTN_ID);
    expect(favoriteBtn).toBeInTheDocument();
    const startRecipeBtn = getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    // adiCIONAR A LISTA DE ELEMENTOS RECOMENDADOSq
    const recomendationCards = getAllByTestId(/recomendation-card/ig);
    const recomendationCardNames = getAllByTestId(/recomendation-title/ig);
    expect(recomendationCards).toHaveLength(+'6');
    expect(recomendationCardNames).toHaveLength(+'6');

    const ingredients = getAllByRole('listitem');
    expect(ingredients).toHaveLength(+'8');
    ingredients.forEach((ingredient, index) => {
      const mockIngredient = mockMeal[`strIngredient${index + 1}`];
      const mockMeasure = mockMeal[`strMeasure${index + 1}`];
      expect((Object.values(ingredient))[1].children)
        .toBe(`${mockIngredient} ${mockMeasure}`);
    });
    // test 34
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    // test 36
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  it(`33, 34 & 35, 36 - Check if there are all the basic components
  in the DRINK details page and if they have the correct value
  - Recipe image, instruction, title,
  share button, favorite button and finish recipe button,
  category, ingredient list`, async () => {
    const { history, getByTestId, queryByTestId, getAllByTestId,
      findByRole, getByRole, getAllByRole } = renderWithRouter(<App />);
    jest.clearAllMocks();
    history.push(DRINK_DETAILS_SCREEN_PATH);

    const recipeImage = await findByRole('img',
      { name: new RegExp(mockDrink.strDrink, 'ig') });
    expect(recipeImage)
      .toHaveProperty('src', `${mockDrink.strDrinkThumb}/preview`);

    const recipeTitles = (
      getAllByRole('heading', { level: 2, name: mockDrink.name })
    );
    expect(recipeTitles[0]).toHaveTextContent(new RegExp(mockDrink.name, 'ig'));

    const recipeInstruction = getByTestId('instructions');
    expect(recipeInstruction).toHaveTextContent(mockDrink.strInstructions);

    const recipeCategory = recipeTitles[1];
    expect(recipeCategory).toHaveTextContent(mockDrink.strCategory);

    const recipeVideo = queryByTestId('video');
    expect(recipeVideo).not.toBeInTheDocument();

    const shareBtn = getByRole('button', { name: /share button/i });
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = getByTestId(FAVORITE_BTN_ID);
    expect(favoriteBtn).toBeInTheDocument();
    const startRecipeBtn = getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    const recomendationCards = getAllByTestId(/recomendation-card/ig);
    const recomendationCardNames = getAllByTestId(/recomendation-title/ig);
    expect(recomendationCards).toHaveLength(+'6');
    expect(recomendationCardNames).toHaveLength(+'6');

    const ingredients = getAllByRole('listitem');
    expect(ingredients).toHaveLength(+'3');
    ingredients.forEach((ingredient, index) => {
      const mockIngredient = mockDrink[`strIngredient${index + 1}`];
      const mockMeasure = mockDrink[`strMeasure${index + 1}`];
      expect((Object.values(ingredient))[1].children)
        .toBe(`${mockIngredient} ${mockMeasure}`);
    });
    // test 34
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    // test 36
    expect(global.fetch).not.toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });

  // !!!!!!!!!!! 37 & 38 não são testados !!!!!!!!!!!!!

  it(`51 - Check if the recipe has the favorite and the share btn
  and if they work`, async () => {
    const { history,
      findByRole, getByTestId, getByText } = renderWithRouter(<App />);
    history.push(FOOD_DETAILS_SCREEN_PATH);

    const shareBtn = await findByRole('button', { name: /share button/i });
    const favoriteBtn = getByTestId(FAVORITE_BTN_ID);

    userEvent.click(shareBtn);
    expect(getByText('Link copied!')).toBeTruthy();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/foods/52771/');

    mockLocalStorage = { favoriteRecipes: JSON.stringify(favoriteRecipes) };

    expect(JSON.parse(mockLocalStorage.favoriteRecipes)).toHaveLength(0);
    userEvent.click(favoriteBtn);
    expect(JSON.parse(mockLocalStorage.favoriteRecipes)).toHaveLength(1);
  });
});
