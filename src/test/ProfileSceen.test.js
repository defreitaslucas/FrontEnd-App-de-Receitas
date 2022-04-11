import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

const PROFILE_SCREEN_PATH = '/profile';
const USER_EMAIL = 'email@email.com';

describe('Testing the Profile Screen', () => {
  const initalStorageData = {
    user: { email: USER_EMAIL },
    cocktailsToken: 1,
    mealsToken: 1,
    doneRecipes: [],
    favoriteRecipes: [],
    inProgressRecipes: {},
  };

  let mockLocalStorage = { ...initalStorageData };

  // console.log(global.JSON.parse().email);

  beforeEach(() => {
    mockLocalStorage = initalStorageData;
    global.JSON.parse = jest.fn().mockImplementationOnce(() => initalStorageData.user);
    global.Storage.prototype.getItem = jest
      .fn((key) => mockLocalStorage[key]);
    global.Storage.prototype.clear = jest.fn(() => { mockLocalStorage = {}; });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it(`82, 83 & 84 - Check if there are all the basic components - profile email,
  favorite and done recipes btn and btn to logout and
  if the user email is visibel`, async () => {
    const { history, getByRole, findByTestId } = renderWithRouter(<App />);
    history.push(PROFILE_SCREEN_PATH);
    expect(await findByTestId('profile-email')).toHaveTextContent(USER_EMAIL);
    expect(getByRole('button', { name: /Favorite Recipes/ig })).toBeInTheDocument();
    expect(getByRole('button', { name: /Done Recipes/ig })).toBeInTheDocument();
    expect(getByRole('button', { name: /Logout/ig })).toBeInTheDocument();
  });

  it(`85 & 86 - Check if the favorite recipes btn and the
  done recipes btn redirect to the correct url`, () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(PROFILE_SCREEN_PATH);

    const favoriteRecipesBtn = getByRole('button', { name: /Favorite Recipes/ig });

    userEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');

    history.push(PROFILE_SCREEN_PATH);
    const doneRecipesBtn = getByRole('button', { name: /Done Recipes/ig });
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it(`87 - Check if the favorite Logout btn redirect to the initial page
  and if the local storage is cleared`, () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(PROFILE_SCREEN_PATH);

    expect(mockLocalStorage).toStrictEqual(initalStorageData);

    const logoutBtn = getByRole('button', { name: /Logout/ig });

    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
    expect(mockLocalStorage).toStrictEqual({});
  });
});
