import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const soupMeals = require('../../cypress/mocks/soupMeals');

const searchTopBtnId = 'search-top-btn';
const nameSearchRadioId = 'name-search-radio';
const searchInputId = 'search-input';
const execSearchBtnId = 'exec-search-btn';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('16 - Testing the redirection if there is just one recipe', () => {
  it('Testing the redirection to Food Details Screen ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/Arrabiata/i);
    expect(renderedInfo).toHaveLength(1);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods/52771');
  });

  it('Testing the redirection to Drink Details Screen ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/Aquamarine/i);
    expect(renderedInfo).toHaveLength(1);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });
});

describe('17 - Testing the cards if there are two or more recipes', () => {
  it('Testing in Foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'soup');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/soup/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    soupMeals.meals.forEach((_meal, index) => {
      const mealRecipeCard = screen.getByTestId(`${index}-recipe-card`);
      const mealCardImg = screen.getByTestId(`${index}-card-img`);
      const mealCardName = screen.getByTestId(`${index}-card-name`);
      expect(mealRecipeCard).toBeInTheDocument();
      expect(mealCardImg).toBeInTheDocument();
      expect(mealCardName).toBeInTheDocument();
    });
  });

  it('Testing in Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'gin');
    userEvent.click(execSearchBtn);
    const renderedInfo = await screen.findAllByText(/gin/i);
    expect(renderedInfo[0]).toBeInTheDocument();
    soupMeals.meals.forEach((_drink, index) => {
      const drinkRecipeCard = screen.getByTestId(`${index}-recipe-card`);
      const drinkCardImg = screen.getByTestId(`${index}-card-img`);
      const drinkCardName = screen.getByTestId(`${index}-card-name`);
      expect(drinkRecipeCard).toBeInTheDocument();
      expect(drinkCardImg).toBeInTheDocument();
      expect(drinkCardName).toBeInTheDocument();
    });
  });
});

describe('18 - Testing the alert if there is no recipe', () => {
  it('Testing in Foods', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(execSearchBtn);
    waitForElement(() => {
      expect(global.alert)
        .toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });

  it('Testing in Drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    userEvent.click(searchTopBtn);
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});
    const nameSearchRadio = screen.getByTestId(nameSearchRadioId);
    const searchInput = screen.getByTestId(searchInputId);
    const execSearchBtn = screen.getByTestId(execSearchBtnId);
    userEvent.click(nameSearchRadio);
    userEvent.type(searchInput, 'xablau');
    userEvent.click(execSearchBtn);
    waitForElement(() => {
      expect(global.alert)
        .toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });
});
