import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

import fetch from '../../cypress/mocks/fetch';

const EXPLORE_FOODS_PATH = '/explore/foods';
const EXPLORE_DRINKS_PATH = '/explore/drinks';

describe('Testing the Explore Recipes Screen', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetch(url));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it(`70 & 71 - Check if there are all the basic components
    - btn to explore by ingredients, btn to explore by nationality
    and btn to explore a random recipe`, () => {
    const { history, getByRole, queryByRole } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS_PATH);

    expect(getByRole('button', { name: /By Ingredient/ig })).toBeInTheDocument();
    expect(getByRole('button', { name: /By Nationality/ig })).toBeInTheDocument();
    expect(getByRole('button', { name: /Surprise me!/ig })).toBeInTheDocument();

    history.push(EXPLORE_DRINKS_PATH);
    expect(getByRole('button', { name: /By Ingredient/ig })).toBeInTheDocument();
    expect(getByRole('button', { name: /Surprise me!/ig })).toBeInTheDocument();
    expect(queryByRole('button', { name: /By Nationality/ig })).not.toBeInTheDocument();
  });

  it('72 - Check if the Ingredient Buttons are redirecting correctly', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    history.push(EXPLORE_DRINKS_PATH);
    let exploreByIngredientsBtn = getByRole('button', { name: /By Ingredient/ig });
    userEvent.click(exploreByIngredientsBtn);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');

    history.push(EXPLORE_FOODS_PATH);
    exploreByIngredientsBtn = getByRole('button', { name: /By Ingredient/ig });
    userEvent.click(exploreByIngredientsBtn);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('73 - Check if the Nationality Button is redirecting correctly', async () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(EXPLORE_FOODS_PATH);
    const exploreByNationalityBtn = getByRole('button', { name: /By Nationality/ig });
    userEvent.click(exploreByNationalityBtn);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });

  it(`74 - Check if the Surprise Buttons are redirecting correctly
    to the details screens of a random recipe`, async () => {
    const { history, getByRole, findByTestId } = renderWithRouter(<App />);

    history.push(EXPLORE_DRINKS_PATH);
    let surpriseMeBtn = getByRole('button', { name: /Surprise me/ig });
    userEvent.click(surpriseMeBtn);
    expect(await findByTestId('recipe-title')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks/178319');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');

    history.push(EXPLORE_FOODS_PATH);
    surpriseMeBtn = getByRole('button', { name: /Surprise me/ig });
    userEvent.click(surpriseMeBtn);
    expect(await findByTestId('recipe-title')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/foods/52771');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
  });
});
