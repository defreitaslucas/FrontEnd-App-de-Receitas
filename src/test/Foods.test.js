import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const meals = require('../../cypress/mocks/meals');
const mealCategories = require('../../cypress/mocks/mealCategories');
const beefMeals = require('../../cypress/mocks/beefMeals');
const breakfastMeals = require('../../cypress/mocks/breakfastMeals');

const TWELVE = 12;
const mealsList = meals.meals.filter((_el, i) => i < TWELVE);

afterEach(() => {
  jest.restoreAllMocks();
});

describe('25 - Testing the cards', () => {
  it('Testing in Foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const renderedInfo = await screen.findAllByText(/Ver Detalhes/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    mealsList.forEach((_meal, index) => {
      const mealRecipeCard = screen.getByTestId(`${index}-recipe-card`);
      const mealCardImg = screen.getByTestId(`${index}-card-img`);
      const mealCardName = screen.getByTestId(`${index}-card-name`);
      expect(mealRecipeCard).toBeInTheDocument();
      expect(mealCardImg).toBeInTheDocument();
      expect(mealCardName).toBeInTheDocument();
    });
  });
});

describe('26 - Testing the recipes list', () => {
  it('Testing in Foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    const renderedInfo = await screen.findAllByText(/Ver Detalhes/i);
    expect(renderedInfo).toHaveLength(TWELVE);
    const nonExistingCard = screen.queryByTestId('12-recipe-card');
    expect(nonExistingCard).not.toBeInTheDocument();
  });
});

describe('27 - Testing the category filter buttons', () => {
  it('Has all buttons, as described', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    waitForElement(() => {
      mealCategories.meals.forEach(({ strCategory }) => {
        const categoryName = screen.getByTestId(`${strCategory}-category-filter`);
        expect(categoryName).toBeInTheDocument();
      });
    });
    const nonExistingCategory = screen.queryByTestId('5-category-filter');
    expect(nonExistingCategory).not.toBeInTheDocument();
  });
});

describe('28 - Testing the category filter', () => {
  it('Testing the Beef', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories),
    });
    const beefCategory = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beefCategory);
    waitForElement(() => {
      beefMeals.meals.forEach(({ strMeal }) => {
        const mealName = screen.getByText(`${strMeal}`);
        expect(mealName).toBeInTheDocument();
      });
    });
  });
});

describe('29 - Testing the category filter', () => {
  it('Testing the Beef', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });
    const beefCategory = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beefCategory);
    waitForElement(() => {
      meals.meals.forEach(({ strMeal }) => {
        const mealName = screen.getByText(`${strMeal}`);
        expect(mealName).toBeInTheDocument();
      });
    });
  });
});

describe('30 - Testing the category filter', () => {
  it('Testing the Breakfast', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });
    const breakfastCategory = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(breakfastCategory);
    waitForElement(() => {
      breakfastMeals.meals.forEach(({ strMeal }) => {
        const mealName = screen.getByText(`${strMeal}`);
        expect(mealName).toBeInTheDocument();
      });
    });
  });
});

describe('31 - Testing the category filter', () => {
  it('Testing the All filter', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });
    const allCategory = screen.getByTestId('All-category-filter');
    userEvent.click(allCategory);
    waitForElement(() => {
      meals.meals.forEach(({ strMeal }) => {
        const meal = screen.getByText(`${strMeal}`);
        expect(meal).toBeInTheDocument();
      });
    });
  });
});

describe('32 - Testing the redirection', () => {
  it('Redirects to the details screen by clicking the card', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const recipeCard = await screen.findByTestId('0-recipe-card');
    userEvent.click(recipeCard);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods/52977');
  });
});
