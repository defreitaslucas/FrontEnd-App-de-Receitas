import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

const EXPLORE_SCREEN_PATH = '/explore';

describe('Testing the Explore Screen', () => {
  // beforeEach(() => {
  //   mockLocalStorage = JSON.stringify(favoriteRecipes);
  //   global.Storage.prototype.getItem = jest.fn(() => mockLocalStorage);
  // });

  // afterEach(() => {
  // });

  it(`67 & 68 - Check if there are all the basic components
    - btn to explore by food and btn to explore by drinks`, () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(EXPLORE_SCREEN_PATH);

    expect(getByRole('button', { name: /Explore Foods/ig })).toBeInTheDocument();
    expect(getByRole('button', { name: /Explore Drinks/ig })).toBeInTheDocument();
  });

  it('69 - Check if the buttons are redirecting correctly', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(EXPLORE_SCREEN_PATH);

    const exploreByFoodsBtn = getByRole('button', { name: /Explore Foods/ig });
    userEvent.click(exploreByFoodsBtn);
    expect(history.location.pathname).toBe('/explore/foods');

    history.push(EXPLORE_SCREEN_PATH);
    const exploreByDrinksBtn = getByRole('button', { name: /Explore Drinks/ig });
    userEvent.click(exploreByDrinksBtn);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});

// import userEvent from '@testing-library/user-event';
// import React from 'react';

// import App from '../App';
// import renderWithRouter from '../utils/renderWithRouter';

// jest.mock('clipboard-copy');
// const copy = require('clipboard-copy');

// // jest.mock('../helpers/localStorage');
// // const localStorage = require('../helpers/localStorage');
// // !!!!! NÃO FUNCIONOU O MOCK DE UMA FUNÇÃO ORIGINAL. TENTAR NOVAMENTE .-. (removeFavoriteRecipeById)

// // Object.assign(navigator, {
// //   clipboard: {
// //     writeText: (text) => {
// //       navigator.clipboard.value = text;
// //       return text;
// //     },
// //     value: '',
// //   },
// // });

// // Object.defineProperty(navigator, 'clipboard', {
// //   value: {
// //     writeText: (text) => {
// //       navigator.clipboard.value = text;
// //       return text;
// //     },
// //     value: '',
// //   },
// // });

// const EXPLORE_SCREEN_PATH = '/explore';
// const EXPLORE_FOOD_BTN = 'explore-foods';
// const EXPLORE_DRINK_BTN = 'explore-drinks';

// describe('Testing the Favorite Screen', () => {
//   const favoriteRecipes = [
//     {
//       id: '52771',
//       type: 'food',
//       nationality: 'Italian',
//       category: 'Vefindarian',
//       alcoholicOrNot: '',
//       name: 'Spicy Arrabiata Penne',
//       image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     },
//     {
//       id: '178319',
//       type: 'drink',
//       nationality: '',
//       category: 'Cocktail',
//       alcoholicOrNot: 'Alcoholic',
//       name: 'Aquamarine',
//       image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     },
//   ];

//   let mockLocalStorage = [];
//   let mockClipBoard = 'initialValueUndefined';

//   beforeEach(() => {
//     mockLocalStorage = JSON.stringify(favoriteRecipes);
//     global.Storage.prototype.getItem = jest.fn(() => mockLocalStorage);
//   });

//   // afterEach(() => {
//   // });

//   it(`60 - Check if there are all the basic components (cumulative with
//     the attributes in common with the screen of recipes made)`, async () => {
//     const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
//     history.push(EXPLORE_SCREEN_PATH);
//     });
//   });
// });
// // ~~~~~!!!!!! criar componente que guarda receitas removidas recentemente e verificar se ela guarda por apenas 7 dias (como simular passagem de tempo aqui? usar um tempo menor para testar e depois definir um maior? o tempo tem que ser feito usando o timestamp ou a data de exclusão (newData) (ou talvez usando um setTimeout))
