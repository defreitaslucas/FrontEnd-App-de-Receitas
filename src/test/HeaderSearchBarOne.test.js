import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const chickenMeals = require('../../cypress/mocks/chickenMeals');
const soupMeals = require('../../cypress/mocks/soupMeals');
// const firstLetterYMeals = require('../../cypress/mocks/firstLetterYMeals');
// const orangeDrinks = require('../../cypress/mocks/orangeDrinks');
const ginDrinks = require('../../cypress/mocks/ginDrinks');
// const firstLetterYDrinks = require('../../cypress/mocks/firstLetterYDrinks');

const searchTopBtnId = 'search-top-btn';
const ingredientSearchRadioId = 'ingredient-search-radio';
const nameSearchRadioId = 'name-search-radio';
const firstLetterSearchRadioId = 'first-letter-search-radio';
const searchInputId = 'search-input';
const execSearchBtnId = 'exec-search-btn';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('13 - Testing the Search Bar elements', () => {
  it('Has all elements, as described ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioId);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    expect(ingredientSearchRadio && nameSearchRadio && firstLetterSearchRadio
      && searchInput && execSearchBtn).toBeInTheDocument();
  });
});

describe('14 - Testing the radio buttons in Foods Screen', () => {
  it('Testing the Ingredient radio button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMeals),
    });
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(ingredientSearchRadio);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/chicken/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it('Testing the Name radio button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(soupMeals),
    });
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'soup');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/soup/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  /*   it('Testing the First letter radio button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(firstLetterYMeals),
    });
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'y');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/y/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=y');
  }); */

  it('Testing the First letter radio button alert', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'ya');
    userEvent.click(execSearchBtn);
    expect(global.alert)
      .toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});

describe('15 - Testing the radio buttons in Drinks Screen', () => {
  /*   it('Testing the Ingredient radio button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(orangeDrinks),
    });
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(ingredientSearchRadio);
    userEvent.type(searchInput, 'orange');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/orange/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=orange');
  }); */

  it('Testing the Name radio button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ginDrinks),
    });
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'gin');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/gin/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  /*  it('Testing the First letter radio button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(firstLetterYDrinks),
    });
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'y');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/y/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y');
  }); */

  it('Testing the First letter radio button alert', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'ya');
    userEvent.click(execSearchBtn);
    expect(global.alert)
      .toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
