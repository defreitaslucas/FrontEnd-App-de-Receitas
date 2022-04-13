import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';
// import areas from '../../cypress/mocks/areas';
// import japaneseMeals from '../../cypress/mocks/japaneseMeals';
// import italianMeals from '../../cypress/mocks/italianMeals';

import fetch from '../../cypress/mocks/fetch';

// const areasArrMock = areas.meals.map((element) => element.strArea);
// const japaneseFoodNamesMock = japaneseMeals.meals.map(({ strMeal }) => strMeal);
// const italianFoodNamesMock = italianMeals.meals.map(({ strMeal }) => strMeal);
const EXPLORE_FOOD_NATIONALITIES_PATH = '/explore/foods/nationalities';

describe('Testing the Explore Recipes Screen', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetch(url));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  // !!!!!!! Adicionar o mockFetch nos demais testes e usar ele para avaliar como o fetch está sendo chamado;
  // adicionar verificação das receitas após selecionar japão e após selecionar italia;

  it(`78, 79 & 80 - Check if there are all the basic components
    - dropdown explore by nationality, all nationalities options
    12 recipe cards`, async () => {
    const { history, getAllByTestId, findByTestId,
      getByRole } = renderWithRouter(<App />);
    history.push(EXPLORE_FOOD_NATIONALITIES_PATH);
    const dropdown = await findByTestId('explore-by-nationality-dropdown');
    expect(dropdown).toBeInTheDocument();
    userEvent.click(dropdown);
    const allCategoriesOptions = getAllByTestId(/option/ig);
    expect(allCategoriesOptions).toHaveLength(+'13');
    // const allCategoriesOptionsText = allCategoriesOptions
    //   .map((object) => (Object.values(object)[1]).children);
    // allCategoriesOptionsText.forEach((item, index) => {
    //   if (index > 0) expect(item).toBe(areasArrMock[index]);
    // });
    expect(getByRole('option', { name: 'All' })).toBeInTheDocument();
    const allCards = getAllByTestId(/recipe-card/ig);
    expect(allCards).toHaveLength(+'12');
  });

  it(`81 - Check if the /explore/drinks/nationalities
    is inexistent`, async () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/explore/drinks/nationalities');
    expect(getByText(/Not Found/ig)).toBeInTheDocument();
  });

  //   it('check if the filters are working correctly', async () => {
  //     const { history, findAllByTestId, findByTestId,
  //       findByRole, findByText, getByRole } = renderWithRouter(<App />);

  //     history.push(EXPLORE_FOOD_NATIONALITIES_PATH);
  //     userEvent.click(await findByTestId('explore-by-nationality-dropdown'));
  //     expect(global.fetch).toHaveBeenCalledTimes(+'6');

  //     userEvent.selectOptions(await findByTestId('Japanese-option'));
  //     const selectedOption = (getByRole('option', { name: 'Japanese' }));
  //     expect(selectedOption.value).toBe('Japanese');
  //     // const allJapaneseCards = await findAllByTestId(/card-name/ig);
  //     // expect(allJapaneseCards).toHaveLength(+'12');
  //     // let allJapaneseCardNames = allJapaneseCards
  //     //   .map((recipe) => (Object.values(recipe)[1]).children);
  //     // allJapaneseCardNames.forEach((cardName, index) => {
  //     //   expect(cardName).toBe(japaneseFoodNamesMock[index]);
  //     // });
  //     // userEvent.click(getByRole('option', { name: 'Italian' }));

//     // userEvent.click(getByRole('option', { name: 'All' }));
//   });
});

// FAZER UMA FUNÇÃO getPropertyValue(propriedade, elementoDOM) PARA SUBSTITUIR O Object.values(recipe)[1]).children;
