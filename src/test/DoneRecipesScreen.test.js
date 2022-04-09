import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

jest.mock('clipboard-copy');
const copy = require('clipboard-copy');

const DONE_SCREEN_PATH = '/done-recipes';
const FOOD_SHARE_BTN_ID = '0-horizontal-share-btn';
const FOOD_NAME_ID = '0-horizontal-name';

const DRINK_NAME_ID = '1-horizontal-name';
const DRINK_SHARE_BTN_ID = '1-horizontal-share-btn';

describe('Testing the Favorite Screen', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  let mockLocalStorage = [];

  copy.mockImplementation((text) => text);

  beforeEach(() => {
    mockLocalStorage = JSON.stringify(doneRecipes);
    global.Storage.prototype.getItem = jest.fn(() => mockLocalStorage);
  });

  // afterEach(() => {
  // });

  it(`54 - Check if there are all the basic components - filters All,
  Food and Drink, recipe card image, text, name, execution date,
  share button, tags`, async () => {
    const { history, findByTestId, getByRole } = renderWithRouter(<App />);
    history.push(DONE_SCREEN_PATH);

    const foodFilterBtn = getByRole('button', { name: /Food/ig });
    const drinkFilterBtn = getByRole('button', { name: /Drinks/ig });
    const clearFilterBtn = getByRole('button', { name: /All/ig });
    const firstElementImg = await findByTestId('0-horizontal-image');
    const firstElementTxt = await findByTestId('0-horizontal-top-text');
    const firstElementName = await findByTestId(FOOD_NAME_ID);
    const firstElementShareBtn = await findByTestId(FOOD_SHARE_BTN_ID);
    const firstElementTag1 = await findByTestId('0-Pasta-horizontal-tag');
    const firstElementTag2 = await findByTestId('0-Curry-horizontal-tag');
    const firstElementDoneData = await findByTestId('0-horizontal-done-date');

    const secondElementImg = await findByTestId('1-horizontal-image');
    const secondElementTxt = await findByTestId('1-horizontal-top-text');
    const secondElementName = await findByTestId(DRINK_NAME_ID);
    const secondElementShareBtn = await findByTestId(DRINK_SHARE_BTN_ID);
    const secondElementDoneData = await findByTestId('1-horizontal-done-date');

    const elementsArr = [foodFilterBtn, drinkFilterBtn, clearFilterBtn, firstElementImg,

      secondElementImg, secondElementTxt, secondElementName, firstElementTxt,
      firstElementName, firstElementShareBtn, firstElementTag1, firstElementTag2,
      firstElementDoneData, secondElementShareBtn, secondElementDoneData];

    elementsArr.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('55 - Check if a food card has all it interface components', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(DONE_SCREEN_PATH);

    const firstElementImg = await findByTestId('0-horizontal-image');
    const firstElementTxt = await findByTestId('0-horizontal-top-text');
    const firstElementName = await findByTestId(FOOD_NAME_ID);
    const firstElementShareBtn = await findByTestId(FOOD_SHARE_BTN_ID);
    const firstElementTag1 = await findByTestId('0-Pasta-horizontal-tag');
    const firstElementTag2 = await findByTestId('0-Curry-horizontal-tag');
    const firstElementDoneData = await findByTestId('0-horizontal-done-date');

    expect(firstElementImg).toHaveProperty('src', doneRecipes[0].image);
    expect(firstElementName).toHaveTextContent(new RegExp(doneRecipes[0].name, 'gi'));
    expect(firstElementTxt).toHaveTextContent(new RegExp(
      doneRecipes[0].category, 'gi',
    ));
    expect(firstElementTag1).toHaveTextContent(new RegExp(doneRecipes[0].tags[0], 'gi'));
    expect(firstElementTag2).toHaveTextContent(new RegExp(doneRecipes[0].tags[1], 'gi'));
    expect(firstElementDoneData)
      .toHaveTextContent(new RegExp(doneRecipes[0].doneDate, 'gi'));
    expect(firstElementShareBtn).toBeInTheDocument();
  });

  it('56 - Check if a drink card has all it interface components', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(DONE_SCREEN_PATH);

    const secondElementImg = await findByTestId('1-horizontal-image');
    const secondElementTxt = await findByTestId('1-horizontal-top-text');
    const secondElementName = await findByTestId(DRINK_NAME_ID);
    const secondElementShareBtn = await findByTestId(DRINK_SHARE_BTN_ID);
    const secondElementDoneData = await findByTestId('1-horizontal-done-date');

    expect(secondElementImg).toHaveProperty('src', doneRecipes[1].image);
    expect(secondElementName)
      .toHaveTextContent(new RegExp(doneRecipes[1].name, 'gi'));
    expect(secondElementTxt).toHaveTextContent(new RegExp(
      doneRecipes[0].alcoholicOrNot, 'gi',
    ));
    expect(secondElementDoneData)
      .toHaveTextContent(new RegExp(doneRecipes[1].doneDate, 'gi'));
    expect(secondElementShareBtn).toBeInTheDocument();
  });

  it(`57 - Check if the share button copy the correct the url and
    alerting that the link was copied`, async () => {
    const { history, findByTestId, findAllByText } = renderWithRouter(<App />);
    history.push(DONE_SCREEN_PATH);

    const firstElementShareBtn = await findByTestId(FOOD_SHARE_BTN_ID);
    const secondElementShareBtn = await findByTestId(DRINK_SHARE_BTN_ID);

    userEvent.click(firstElementShareBtn);
    // expect(await findByText('Link copied!')).toBeInTheDocument(); !!! ESSE TESTE SÓ PODERÁ SER FEITO ADEQUADAMENTE COM UMA MUDANÇA EM COMO ESTÁ SENDO REGULADA A APARIÇÃO OU NÃO DO TEXTO. CRIAR O COMPONENTE CARD E COLOCAR AQUELAS FUNÇÕES DE ADICIONAR AO FAVORITO E DE COMPARTILHAR DIRETO NESSES COMPONENTES. MESMO COM "display: none", O ELEMENTO AINDA É CONSIDERADO COMO DENTRO
    expect(await findAllByText('Link copied!')).toBeTruthy();
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/foods/52771');

    userEvent.click(secondElementShareBtn);
    // expect(await findByText('Link copied!')).toBeInTheDocument(); !!! ESSE TESTE SÓ PODERÁ SER FEITO ADEQUADAMENTE COM UMA MUDANÇA EM COMO ESTÁ SENDO REGULADA A APARIÇÃO OU NÃO DO TEXTO. CRIAR O COMPONENTE CARD E COLOCAR AQUELAS FUNÇÕES DE ADICIONAR AO FAVORITO E DE COMPARTILHAR DIRETO NESSES COMPONENTES. MESMO COM "display: none", O ELEMENTO AINDA É CONSIDERADO COMO DENTRO
    expect(copy).toHaveBeenCalledTimes(2);
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });
  //   expect(mockCopy)
  //     .toHaveBeenCalledWith('http://localhost:3000/foods/52771');

  it('58 - Check if the food, drink and all filters are working properly', async () => {
    const {
      history, getByTestId, findAllByTestId,
    } = renderWithRouter(<App />);
    history.push(DONE_SCREEN_PATH);

    const foodFilterBtn = getByTestId('filter-by-food-btn');
    const drinkFilterBtn = getByTestId('filter-by-drink-btn');
    const clearFilterBtn = getByTestId('filter-by-all-btn');
    let allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(2);

    userEvent.click(foodFilterBtn);
    allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(1); // não estou conseguindo usar operações assincronas que não o find aqui;
    expect(allElementsName[0]).toHaveTextContent(doneRecipes[0].name);

    userEvent.click(drinkFilterBtn);
    allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(1);
    expect(allElementsName[0]).toHaveTextContent(doneRecipes[1].name);

    userEvent.click(clearFilterBtn);
    allElementsName = await findAllByTestId(/horizontal-name/);
    expect(allElementsName).toHaveLength(2);
  });

  it('59 - Check if the food, drink and all filters are working properly', async () => {
    const { history, findByTestId } = renderWithRouter(<App />);
    history.push(DONE_SCREEN_PATH);
    const firstElementName = await findByTestId(FOOD_NAME_ID);
    userEvent.click(firstElementName);
    expect(history.location.pathname).toBe('/foods/52771');
  });
});
// ~~~~~!!!!!! criar componente que guarda receitas removidas recentemente e verificar se ela guarda por apenas 7 dias (como simular passagem de tempo aqui? usar um tempo menor para testar e depois definir um maior? o tempo tem que ser feito usando o timestamp ou a data de exclusão (newData) (ou talvez usando um setTimeout))
