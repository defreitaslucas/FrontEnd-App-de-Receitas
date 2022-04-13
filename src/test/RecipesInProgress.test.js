import userEvent from '@testing-library/user-event';
import React from 'react';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

const INPROGRESS_FOODS_SCREEN_PATH = '/foods/52771/in-progress';
const INPROGRESS_DRINKS_SCREEN_PATH = '/drinks/178319/in-progress';

const mockMeal = oneMeal.meals[0];
const mockDrink = oneDrink.drinks[0];

describe('Testing the Recipe Progress Screen', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vefindarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  const inProgressRecipes = {
    meals: {
      52771: ['penne rigate 1 pound', 'olive oil 1/4 cup', 'garlic 3 cloves'],
    },
    cocktails: {
      178319: ['Hpnotiq 2 oz'],
    },
  };

  let mockLocalStorage = { favoriteRecipes: JSON.stringify(favoriteRecipes),
    inProgressRecipes: JSON.stringify(inProgressRecipes) };

  copy.mockImplementation((text) => text);

  beforeEach(() => {
    mockLocalStorage = { favoriteRecipes: JSON.stringify(favoriteRecipes),
      inProgressRecipes: JSON.stringify(inProgressRecipes) };
    global.Storage.prototype.getItem = jest
      .fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.setItem = jest
      .fn((key, value) => { mockLocalStorage[key] = value; });

    global.fetch = jest.fn((url) => fetch(url));
  });

  // !!!!!!!!!!!!!!!!!! CONSERTAR O LOCALSTORAGE NAS OUTRAS PAGINAS DE TESTES QUE EU FIZ!!!!!

  // afterEach(() => {
  // });

  it(`47 & 48 - Check if there are all the basic components in the document and
  if they have the correct value - Recipe image, instruction, title,
  share button, favorite button and finish recipe button,
  category, ingredient list`, async () => {
    const { history, getByTestId,
      findByRole, getByRole, getAllByRole } = renderWithRouter(<App />);
    history.push(INPROGRESS_FOODS_SCREEN_PATH);

    const recipeImage = await findByRole('img',
      { name: new RegExp(favoriteRecipes[0].name, 'ig') });
    expect(recipeImage)
      .toHaveProperty('src', mockMeal.strMealThumb);

    const recipeTitles = (
      getAllByRole('heading', { level: 2, name: mockMeal.name })
    ); // aparentemente a propriedade 'level' não existe nessa versão do rtl
    expect(recipeTitles[0]).toHaveTextContent(new RegExp(mockMeal.name, 'ig'));

    const recipeInstruction = getByTestId('instructions');
    expect(recipeInstruction).toHaveTextContent(mockMeal.strInstructions);

    const recipeCategory = recipeTitles[1];
    expect(recipeCategory).toHaveTextContent(mockMeal.strCategory);

    const shareBtn = getByRole('button', { name: /share button/i });
    expect(shareBtn).toBeInTheDocument();
    const favoriteBtn = getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    const finishRecipeBtn = getByRole('button', { name: /finish recipe/ig });
    expect(finishRecipeBtn).toHaveProperty('disabled', true);

    const ingredients = getAllByRole('checkbox');
    expect(ingredients).toHaveLength(+'8');
    ingredients.forEach((ingredient, index) => {
      const mockIngredient = mockMeal[`strIngredient${index + 1}`];
      const mockMeasure = mockMeal[`strMeasure${index + 1}`];
      expect(ingredient.name)
        .toBe(`${mockIngredient} ${mockMeasure}`);
    });
  });

  it('48 - Check if a drink recipe has all checkbox', async () => {
    const { history,
      findByRole, getAllByRole } = renderWithRouter(<App />);
    history.push(INPROGRESS_DRINKS_SCREEN_PATH);

    const recipeImage = await findByRole('img', { name: 'Aquamarine' });
    expect(recipeImage)
      .toHaveProperty('src', mockDrink.strDrinkThumb);

    const ingredients = getAllByRole('checkbox');
    expect(ingredients).toHaveLength(+'3');
    ingredients.forEach((ingredient, index) => {
      const mockIngredient = mockDrink[`strIngredient${index + 1}`];
      const mockMeasure = mockDrink[`strMeasure${index + 1}`];
      expect(ingredient.name)
        .toBe(`${mockIngredient} ${mockMeasure}`);
    });
  });

  it(`49, 50, 52 & 53 - Check if you can check all ingredients in a DRINKS recipe;
  if the ingredients have a line-through after re-start the recipe;
  if the finish button is anable only after match all ingredients;
  if the finish button get you to the right page`, async () => {
    const { history, findAllByRole, getByRole } = renderWithRouter(<App />);
    history.push(INPROGRESS_DRINKS_SCREEN_PATH);

    expect(JSON.parse(mockLocalStorage.inProgressRecipes).cocktails[178319])
      .toHaveLength(+'1');

    const ingredients = await findAllByRole('checkbox');
    expect(ingredients).toHaveLength(+'3');

    const finishRecipeBtn = getByRole('button', { name: /finish recipe/ig });
    expect(finishRecipeBtn).toHaveProperty('disabled', true);

    ingredients.forEach((drinkIngredient, index) => {
      if (index > 0) {
        expect(drinkIngredient).toHaveProperty('checked', false);
        expect(drinkIngredient.classList[0]).toBeFalsy();
        userEvent.click(drinkIngredient);
        expect(drinkIngredient.classList[0]).toBe('clicked');
      } else {
        expect(finishRecipeBtn).toHaveProperty('disabled', true);
        expect(drinkIngredient).toHaveProperty('checked', true);
        expect(drinkIngredient
          .parentElement.parentElement.classList[0]).toBe('clicked');
        // !!!!!!!!!!!!!!! GAMBIARRA!!!!!!!!!!!!!
      }
    });

    expect(JSON.parse(mockLocalStorage.inProgressRecipes).cocktails[178319])
      .toHaveLength(+'3');

    await expect(finishRecipeBtn).toHaveProperty('disabled', false);

    userEvent.click(finishRecipeBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it(`49, 50, 52 & 53 - Check if you can check all ingredients in a FOOD recipe;
  if the ingredients have a line-through after re-start the recipe;
  if the finish button is anable only after match all ingredients;
  if the finish button get you to the right page`, async () => {
    const { history, findAllByRole, getByRole } = renderWithRouter(<App />);
    history.push(INPROGRESS_FOODS_SCREEN_PATH);

    expect(JSON.parse(mockLocalStorage.inProgressRecipes).meals[52771])
      .toHaveLength(+'3');

    const ingredients = await findAllByRole('checkbox');
    expect(ingredients).toHaveLength(+'8');

    const finishRecipeBtn = getByRole('button', { name: /finish recipe/ig });
    expect(finishRecipeBtn).toHaveProperty('disabled', true);

    ingredients.forEach((foodIngredient, index) => {
      if (index > +'2') {
        expect(foodIngredient).toHaveProperty('checked', false);
        expect(foodIngredient.classList[0]).toBeFalsy();
        userEvent.click(foodIngredient);
        expect(foodIngredient.classList[0]).toBe('clicked');
      } else {
        expect(finishRecipeBtn).toHaveProperty('disabled', true);
        expect(foodIngredient).toHaveProperty('checked', true);
        expect(foodIngredient
          .parentElement.parentElement.classList[0]).toBe('clicked');
        // !!!!!!!!!!!!!!! GAMBIARRA!!!!!!!!!!!!!
      }
    });

    expect(JSON.parse(mockLocalStorage.inProgressRecipes).meals[52771])
      .toHaveLength(+'8');

    await expect(finishRecipeBtn).toHaveProperty('disabled', false);

    userEvent.click(finishRecipeBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it(`51 - Check if the recipe has the favorite and the share btn
  and if they work`, async () => {
    const { history,
      findByRole, getByTestId, getByText } = renderWithRouter(<App />);
    history.push(INPROGRESS_FOODS_SCREEN_PATH);

    const shareBtn = await findByRole('button', { name: /share button/i });
    const favoriteBtn = getByTestId('favorite-btn');

    userEvent.click(shareBtn);
    expect(getByText('Link copied!')).toBeTruthy();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/foods/52771');

    mockLocalStorage = { favoriteRecipes: JSON.stringify(favoriteRecipes),
      inProgressRecipes: JSON.stringify(inProgressRecipes) };

    expect(JSON.parse(mockLocalStorage.favoriteRecipes)).toHaveLength(2);
    userEvent.click(favoriteBtn);
    expect(JSON.parse(mockLocalStorage.favoriteRecipes)).toHaveLength(1);
  });
});
