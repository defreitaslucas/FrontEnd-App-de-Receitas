import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

jest.mock('clipboard-copy');
const copy = require('clipboard-copy');

// jest.mock('../helpers/localStorage');
// const localStorage = require('../helpers/localStorage');
// !!!!! NÃO FUNCIONOU O MOCK DE UMA FUNÇÃO ORIGINAL. TENTAR NOVAMENTE .-. (removeFavoriteRecipeById)

// Object.assign(navigator, {
//   clipboard: {
//     writeText: (text) => {
//       navigator.clipboard.value = text;
//       return text;
//     },
//     value: '',
//   },
// });

// Object.defineProperty(navigator, 'clipboard', {
//   value: {
//     writeText: (text) => {
//       navigator.clipboard.value = text;
//       return text;
//     },
//     value: '',
//   },
// });

const FAV_SCREEN_PATH = '/favorite-recipes';
const FOOD_SHARE_BTN = '0-horizontal-share-btn';
const FOOD_FAV_BTN = '0-horizontal-favorite-btn';
const FOOD_NAME = '0-horizontal-name';

const DRINK_NAME = '1-horizontal-name';

describe('Testing the Favorite Screen', () => {
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vefindarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  let mockLocalStorage = [];
  let mockClipBoard = 'initialValueUndefined';

  copy.mockImplementation((text) => {
    console.log('function', text);
    mockClipBoard = text;
    console.log('function mock', mockClipBoard);
    return text;
    // !!!! nenhuma das 4 linhas acima estão funcionando. Tentar fazer funcionar. Achei que era algo de escopo, mas acho que o console.log deveria funcionar independente de escopo
  });

  // removeFavoriteRecipeById.mockImplementation((recipeId) => {
  //   const filteredFavorites = mockLocalStorage.filter(({ id }) => id !== recipeId);
  //   mockLocalStorage = filteredFavorites;
  // });

  // const mockRemoveFavoriteRecipeById = jest
  //   .spyOn(localStorage, 'removeFavoriteRecipeById')
  //   .mockImplementation((recipeId) => {
  //     const filteredFavorites = mockLocalStorage.filter(({ id }) => id !== recipeId);
  //     mockLocalStorage = filteredFavorites;
  //   });

  beforeEach(() => {
    mockLocalStorage = JSON.stringify(favoriteRecipes);
    global.Storage.prototype.getItem = jest.fn(() => mockLocalStorage);
  });

  // afterEach(() => {
  // });

  it(`60 - Check if there are all the basic components (cumulative with
    the attributes in common with the screen of recipes made)`, async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);

    const foodFilterBtn = getByTestId('filter-by-food-btn');
    const drinkFilterBtn = getByTestId('filter-by-drink-btn');
    const clearFilterBtn = getByTestId('filter-by-all-btn');
    const firstElementImg = await findByTestId('0-horizontal-image');
    const firstElementTxt = await findByTestId('0-horizontal-top-text');
    const firstElementName = await findByTestId(FOOD_NAME);
    const firstElementShareBtn = await findByTestId(FOOD_SHARE_BTN);
    const firstElementfavoriteBtn = await findByTestId(FOOD_FAV_BTN);
    const secondElementImg = await findByTestId('1-horizontal-image');
    const secondElementTxt = await findByTestId('1-horizontal-top-text');
    const secondElementName = await findByTestId(DRINK_NAME);
    const secondElementShareBtn = await findByTestId('1-horizontal-share-btn');
    const secondElementfavoriteBtn = await findByTestId('1-horizontal-favorite-btn');

    const elementsArr = [foodFilterBtn, drinkFilterBtn, clearFilterBtn, firstElementImg,
      firstElementTxt, firstElementName, firstElementShareBtn, firstElementfavoriteBtn,
      secondElementImg, secondElementTxt, secondElementName, secondElementShareBtn,
      secondElementfavoriteBtn];

    elementsArr.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('61 - Check if a food card has all it interface components', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);

    const firstElementImg = await findByTestId('0-horizontal-image');
    const firstElementTxt = await findByTestId('0-horizontal-top-text');
    const firstElementName = await findByTestId(FOOD_NAME);
    const firstElementShareBtn = await findByTestId(FOOD_SHARE_BTN);
    const firstElementfavoriteBtn = await findByTestId(FOOD_FAV_BTN);
    const favoriteBtnSrc = Object.values(firstElementfavoriteBtn)[1].src;

    expect(firstElementImg).toHaveProperty('src', favoriteRecipes[0].image);
    expect(firstElementName).toHaveTextContent(new RegExp(favoriteRecipes[0].name, 'gi'));
    expect(firstElementTxt).toHaveTextContent(new RegExp(
      favoriteRecipes[0].category, 'gi',
    ));
    expect(firstElementShareBtn).toBeInTheDocument();
    expect(favoriteBtnSrc.includes('blackHeartIcon')).toBe(true);
  });

  it('62 - Check if a drink card has all it interface components', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);

    const secondElementImg = await findByTestId('1-horizontal-image');
    const secondElementTxt = await findByTestId('1-horizontal-top-text');
    const secondElementName = await findByTestId(DRINK_NAME);
    const secondElementShareBtn = await findByTestId('1-horizontal-share-btn');
    const secondElementfavoriteBtn = await findByTestId('1-horizontal-favorite-btn');
    const favoriteBtnSrc = Object.values(secondElementfavoriteBtn)[1].src;

    expect(secondElementImg).toHaveProperty('src', favoriteRecipes[1].image);
    expect(secondElementName)
      .toHaveTextContent(new RegExp(favoriteRecipes[1].name, 'gi'));
    expect(secondElementTxt).toHaveTextContent(new RegExp(
      favoriteRecipes[0].alcoholicOrNot, 'gi',
    ));
    expect(secondElementShareBtn).toBeInTheDocument();
    expect(favoriteBtnSrc.includes('blackHeartIcon')).toBe(true);
  });

  it(`63 - Check if the share button copy the correct the url and 
    alerting that the link was copied`, async () => {
    const { history, findByTestId, findAllByText } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);

    const firstElementShareBtn = await findByTestId(FOOD_SHARE_BTN);

    // expect(navigator.clipboard.value).toBe('');

    userEvent.click(firstElementShareBtn);
    // expect(await findByText('Link copied!')).toBeInTheDocument(); !!! ESSE TESTE SÓ PODERÁ SER FEITO ADEQUADAMENTE COM UMA MUDANÇA EM COMO ESTÁ SENDO REGULADA A APARIÇÃO OU NÃO DO TEXTO. CRIAR O COMPONENTE CARD E COLOCAR AQUELAS FUNÇÕES DE ADICIONAR AO FAVORITO E DE COMPARTILHAR DIRETO NESSES COMPONENTES. MESMO COM "display: none", O ELEMENTO AINDA É CONSIDERADO COMO DENTRO
    expect(await findAllByText('Link copied!')).toBeTruthy();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
    // expect(navigator.clipboard.value).toBe('http://localhost:3000/foods/52771');

    // expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771'); PORQUE ESSA LINHA ESTÁ DANDO ERRO?

    // ?????? será que usando user.event.type({control} + l) dá pra acessar a barra de url e colar a url de busca e analizar o retorno?
  });
  //   expect(mockCopy)
  //     .toHaveBeenCalledWith('http://localhost:3000/foods/52771');

  it(`64 - Checkt if after disfavor a recipe it will be removed
  from the list`, async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);

    global.Storage.prototype.setItem = jest
      .fn((_key, value) => { mockLocalStorage = value; });

    const firstElementfavoriteBtn = await findByTestId(FOOD_FAV_BTN);
    const firstElementName = await findByTestId(FOOD_NAME);
    const secondElementName = await findByTestId(DRINK_NAME);

    expect(firstElementName).toHaveTextContent(new RegExp(favoriteRecipes[0].name, 'gi'));
    expect(secondElementName)
      .toHaveTextContent(new RegExp(favoriteRecipes[1].name, 'gi'));

    userEvent.click(firstElementfavoriteBtn);

    expect(firstElementName).toHaveTextContent(new RegExp(favoriteRecipes[1].name, 'gi'));
    expect(secondElementName).not.toBeInTheDocument();
    expect(JSON.parse(mockLocalStorage)
      .some(({ name }) => name === favoriteRecipes[0].name))
      .toBe(false);

    global.Storage.prototype.setItem.mockClear();
  });

  it('65 - Check if the food, drink and all filters are working properly', async () => {
    const {
      history, getByTestId, findAllByTestId,
    } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);

    const foodFilterBtn = getByTestId('filter-by-food-btn');
    const drinkFilterBtn = getByTestId('filter-by-drink-btn');
    const clearFilterBtn = getByTestId('filter-by-all-btn');
    let allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(2);

    userEvent.click(foodFilterBtn);
    allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(1); // não estou conseguindo usar operações assincronas que não o find aqui;
    expect(allElementsName[0]).toHaveTextContent(favoriteRecipes[0].name);

    userEvent.click(drinkFilterBtn);
    allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(1);
    expect(allElementsName[0]).toHaveTextContent(favoriteRecipes[1].name);

    userEvent.click(clearFilterBtn);
    allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(2);
  });

  it('66 - Check if the food, drink and all filters are working properly', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(FAV_SCREEN_PATH);
    const firstElementName = await findByTestId(FOOD_NAME);
    userEvent.click(firstElementName);
    expect(history.location.pathname).toBe('/foods/52771');
  });
});
// ~~~~~!!!!!! criar componente que guarda receitas removidas recentemente e verificar se ela guarda por apenas 7 dias (como simular passagem de tempo aqui? usar um tempo menor para testar e depois definir um maior? o tempo tem que ser feito usando o timestamp ou a data de exclusão (newData) (ou talvez usando um setTimeout))
