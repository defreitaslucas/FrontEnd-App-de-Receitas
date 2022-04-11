import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Header from '../component/Header';
import App from '../App';
import ProfileScreen from '../pages/ProfileScreen';
import FavoriteRecipesScreen from '../pages/FavoriteRecipesScreen';

const profileTopBtnId = 'profile-top-btn';
const pageTitleId = 'page-title';
const searchTopBtnId = 'search-top-btn';
const profileIcon = 'http://localhost/profileIcon.svg';
const searchIcon = 'http://localhost/searchIcon.svg';

describe('9 - Testing the Header elements', () => {
  it('Has all elements, as described', () => {
    renderWithRouter(<Header title="Foods" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const pageTitle = screen.getByTestId(pageTitleId);
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    expect(profileTopBtn && pageTitle && searchTopBtn).toBeInTheDocument();
  });
});

describe('10 - Testing the icons', () => {
  it('Is not present in login screen', () => {
    renderWithRouter(<App />);
    const profileTopBtn = screen.queryByTestId(profileTopBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn && pageTitle && searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in foods recipes main screen', () => {
    renderWithRouter(<Header title="Foods" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn.src).toBe(searchIcon);
  });

  it('Has the correct icons in drinks recipes main screen', () => {
    renderWithRouter(<Header title="Drinks" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn.src).toBe(searchIcon);
  });

  it('Is not present in details screen of a food recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');
    const profileTopBtn = screen.queryByTestId(profileTopBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn && pageTitle && searchTopBtn).not.toBeInTheDocument();
  });

  it('Is not present in details screen of a drink recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');
    const profileTopBtn = screen.queryByTestId(profileTopBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn && pageTitle && searchTopBtn).not.toBeInTheDocument();
  });

  it('Is not present in food progress recipe screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress');
    const profileTopBtn = screen.queryByTestId(profileTopBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn && pageTitle && searchTopBtn).not.toBeInTheDocument();
  });

  it('Is not present in drink progress recipe screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    const profileTopBtn = screen.queryByTestId(profileTopBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn && pageTitle && searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in explore screen', () => {
    renderWithRouter(<Header title="Explore" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in food explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in drink explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in explore food by ingredient screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in explore drink by ingredient screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in explore foods by nationality screen', () => {
    renderWithRouter(<Header title="Explore Nationalities" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn.src).toBe(searchIcon);
  });

  it('Has the correct icons in profile screen', () => {
    renderWithRouter(<ProfileScreen />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in done recipes screen', () => {
    renderWithRouter(<Header title="Done Recipes" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });

  it('Has the correct icons in favorite recipes screen', () => {
    renderWithRouter(<FavoriteRecipesScreen />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    const searchTopBtn = screen.queryByTestId(searchTopBtnId);
    expect(profileTopBtn).toBeInTheDocument();
    expect(profileTopBtn.src).toBe(profileIcon);
    expect(searchTopBtn).not.toBeInTheDocument();
  });
});

describe('11 - Testing the redirection', () => {
  it('Redirects to the profile screen by clicking the profile button', () => {
    const { history } = renderWithRouter(<Header title="Foods" />);
    const profileTopBtn = screen.getByTestId(profileTopBtnId);
    userEvent.click(profileTopBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});

describe('12 - Testing the search button', () => {
  it('When clicking the search button, the search bar should appear/disappear', () => {
    renderWithRouter(<App />);
    const email = 'test.trybe@test.com';
    const password = '123456789';
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, email);
    expect(emailInput).toHaveValue(email);
    userEvent.type(passwordInput, password);
    expect(passwordInput).toHaveValue(password);
    userEvent.click(submitButton);
    const searchTopBtn = screen.getByTestId(searchTopBtnId);
    let searchInput = screen.queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
    userEvent.click(searchTopBtn);
    searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchTopBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
