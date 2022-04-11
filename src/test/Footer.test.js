import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const footerId = 'footer';
const foodBottomBtnId = 'food-bottom-btn';
const drinksBottomBtnId = 'drinks-bottom-btn';
const exploreBottomBtnId = 'explore-bottom-btn';
const mealIcon = 'http://localhost/mealIcon.svg';
const drinkIcon = 'http://localhost/drinkIcon.svg';
const exploreIcon = 'http://localhost/exploreIcon.svg';

describe('19 - Testing the Footer elements', () => {
  it('Has all elements, as described ', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });
});

describe('20 - Testing the Footer icons', () => {
  it('Has all icons, as described ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(foodBottomBtn.src).toBe(mealIcon);
    expect(drinksBottomBtn.src).toBe(drinkIcon);
    expect(exploreBottomBtn.src).toBe(exploreIcon);
  });
});

describe('21 - Testing the Footer presence', () => {
  it('Is not present in Login screen', () => {
    renderWithRouter(<App />);
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });

  it('Is present in Foods screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Drinks screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is not present in details screen of a food recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });

  it('Is not present in details screen of a drink recipe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319');
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });

  it('Is not present in food progress recipe screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress');
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });

  it('Is not present in drink progress recipe screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });

  it('Is present in Explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Foods Explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Drinks Explore screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Foods Explore by Ingredient screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/ingredients');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Drinks Explore by Ingredient screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/drinks/ingredients');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Foods Explore by Nationality screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore/foods/nationalities');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is present in Profile screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const footer = screen.getByTestId(footerId);
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .toBeInTheDocument();
  });

  it('Is not present in Done Recipes screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });

  it('Is not present in Favorite Recipes screen', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const footer = screen.queryByTestId(footerId);
    const foodBottomBtn = screen.queryByTestId(foodBottomBtnId);
    const drinksBottomBtn = screen.queryByTestId(drinksBottomBtnId);
    const exploreBottomBtn = screen.queryByTestId(exploreBottomBtnId);
    expect(footer && foodBottomBtn && drinksBottomBtn && exploreBottomBtn)
      .not.toBeInTheDocument();
  });
});

describe('22 - Redirects to Foods Screen', () => {
  it('Redirects to Foods Screen, as described ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const foodBottomBtn = screen.getByTestId(foodBottomBtnId);
    userEvent.click(foodBottomBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});

describe('23 - Redirects to Drinks Screen', () => {
  it('Redirects to Drinks Screen, as described ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const drinksBottomBtn = screen.getByTestId(drinksBottomBtnId);
    userEvent.click(drinksBottomBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});

describe('24 - Redirects to Explore Screen', () => {
  it('Redirects to Explore Screen, as described ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const exploreBottomBtn = screen.getByTestId(exploreBottomBtnId);
    userEvent.click(exploreBottomBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });
});
