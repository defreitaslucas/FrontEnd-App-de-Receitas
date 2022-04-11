import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const drinks = require('../../cypress/mocks/drinks');
const drinkCategories = require('../../cypress/mocks/drinkCategories');
const ordinaryDrinks = require('../../cypress/mocks/ordinaryDrinks');
const cocktailDrinks = require('../../cypress/mocks/cocktailDrinks');

const TWELVE = 12;
const drinksList = drinks.drinks.filter((_el, i) => i < TWELVE);

afterEach(() => {
  jest.restoreAllMocks();
});

describe('25 - Testing the cards', () => {
  it('Testing in Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
    const renderedInfo = await screen.findAllByText(/Ver Detalhes/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    drinksList.forEach((_drink, index) => {
      const drinkRecipeCard = screen.getByTestId(`${index}-recipe-card`);
      const drinkCardImg = screen.getByTestId(`${index}-card-img`);
      const drinkCardName = screen.getByTestId(`${index}-card-name`);
      expect(drinkRecipeCard).toBeInTheDocument();
      expect(drinkCardImg).toBeInTheDocument();
      expect(drinkCardName).toBeInTheDocument();
    });
  });
});

describe('26 - Testing the recipes list', () => {
  it('Testing in Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
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
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    waitForElement(() => {
      drinkCategories.drinks.forEach(({ strCategory }) => {
        const categoryName = screen.getByTestId(`${strCategory}-category-filter`);
        expect(categoryName).toBeInTheDocument();
      });
    });
    const nonExistingCategory = screen.queryByTestId('5-category-filter');
    expect(nonExistingCategory).not.toBeInTheDocument();
  });
});

describe('28 - Testing the category filter', () => {
  it('Testing the Ordinary Drink', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });
    const ordinaryCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryCategory);
    waitForElement(() => {
      ordinaryDrinks.drinks.forEach(({ strDrink }) => {
        const drinkName = screen.getByText(`${strDrink}`);
        expect(drinkName).toBeInTheDocument();
      });
    });
  });
});

describe('29 - Testing the category filter', () => {
  it('Testing the Ordinary Drink', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    });
    const ordinaryCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryCategory);
    waitForElement(() => {
      drinks.drinks.forEach(({ strDrink }) => {
        const drinkName = screen.getByText(`${strDrink}`);
        expect(drinkName).toBeInTheDocument();
      });
    });
  });
});

describe('30 - Testing the category filter', () => {
  it('Testing the Cocktail', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    });
    const cocktailCategory = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(cocktailCategory);
    waitForElement(() => {
      cocktailDrinks.drinks.forEach(({ strDrink }) => {
        const drinkName = screen.getByText(`${strDrink}`);
        expect(drinkName).toBeInTheDocument();
      });
    });
  });
});

describe('31 - Testing the category filter', () => {
  it('Testing the All filter', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks),
    });
    const allCategory = screen.getByTestId('All-category-filter');
    userEvent.click(allCategory);
    waitForElement(() => {
      drinks.drinks.forEach(({ strDrink }) => {
        const drink = screen.getByText(`${strDrink}`);
        expect(drink).toBeInTheDocument();
      });
    });
  });
});

describe('32 - Testing the redirection', () => {
  it('Redirects to the details screen by clicking the card', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const recipeCard = await screen.findByTestId('0-recipe-card');
    userEvent.click(recipeCard);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');
  });
});
