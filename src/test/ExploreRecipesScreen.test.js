import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

import fetch from '../../cypress/mocks/fetch';

const EXPLORE_FOODS_PATH = '/explore/foods';
const EXPLORE_DRINKS_PATH = '/explore/drinks';

describe('Testing the Explore Recipes Screen', () => {
  beforeEach(() => {
    global.Storage.prototype.fetch = jest.fn((url) => fetch(url));
  });

  afterEach(() => {
    global.Storage.prototype.fetch.mockClear();
  });

  it(`70 & 71 - Check if there are all the basic components
    - btn to explore by ingredients, btn to explore by nationality
    and btn to explore a random recipe`, async () => {
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

  it('72 - Check if the Ingredient Buttons are redirecting correctly', async () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(EXPLORE_DRINKS_PATH);
    userEvent.click(getByRole('button', { name: /By Ingredient/ig }));

    const exploreByFoodsBtn = getByRole('button', { name: /Explore Foods/ig });

    history.push(EXPLORE_FOODS_PATH);
  });
});
