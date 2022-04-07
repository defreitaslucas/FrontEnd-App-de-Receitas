import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

// const fetchMock = require('../../cypress/mocks/fetch');
// const soupMeals = require('../../cypress/mocks/soupMeals');
// const ginDrinks = require('../../cypress/mocks/ginDrinks');
const chickenMeals = require('../../cypress/mocks/chickenMeals');

beforeEach(() => {
  renderWithRouter(<App />);
  const email = 'test.trybe@test.com';
  const password = '123456789';
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const submitButton = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, email);
  userEvent.type(passwordInput, password);
  userEvent.click(submitButton);
  const searchTopBtn = screen.getByTestId('search-top-btn');
  userEvent.click(searchTopBtn);
});

afterEach(() => jest.restoreAllMocks());

describe('13 - Testing the Search Bar elements', () => {
  it('Has all elements, as described ', () => {
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    expect(ingredientSearchRadio && nameSearchRadio && firstLetterSearchRadio
      && searchInput && execSearchBtn).toBeInTheDocument();
  });
});

describe('14 - Testing the radio buttons', () => {
  it('Testing the Ingredient radio button', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockReturnValue({
      json: jest.fn().mockReturnValue(chickenMeals),
    });
    global.fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(ingredientSearchRadio);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(execSearchBtn);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
});
