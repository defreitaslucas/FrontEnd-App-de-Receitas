import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

const meals = require('../../cypress/mocks/meals');

const TWELVE = 12;
const mealsList = meals.meals.filter((_el, i) => i < TWELVE);

describe('25 - Testing the cards', () => {
  it('Testing in Foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsList),
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
