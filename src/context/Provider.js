import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const TWELVE = 12;
  const FIVE = 5;

  const [foods, setFoods] = useState({
    foodsList: [],
    renderedFoodsList: [],
    foodsCategories: [],
    selectedCategory: '',
  });

  const [drinks, setDrinks] = useState({
    drinksList: [],
    renderedDrinksList: [],
    drinksCategories: [],
    selectedCategory: '',
  });

  useEffect(() => {
    async function getFoodsList() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveFirstFoods = data.meals.filter((_el, i) => i < TWELVE);
      setFoods((prevState) => ({
        ...prevState,
        foodsList: twelveFirstFoods,
        renderedFoodsList: twelveFirstFoods,
      }));
    }
    getFoodsList();
    async function getDrinksList() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveFirstDrinks = data.drinks.filter((_el, i) => i < TWELVE);
      setDrinks((prevState) => ({
        ...prevState,
        drinksList: twelveFirstDrinks,
        renderedDrinksList: twelveFirstDrinks,
      }));
    }
    getDrinksList();
    async function getFoodsCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const fiveFirstCategories = data.meals.map((el) => el.strCategory)
        .filter((_el, i) => i < FIVE);
      setFoods((prevState) => ({
        ...prevState,
        foodsCategories: fiveFirstCategories,
      }));
    }
    getFoodsCategories();
    async function getDrinksCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const fiveFirstCategories = data.drinks.map((el) => el.strCategory)
        .filter((_el, i) => i < FIVE);
      setDrinks((prevState) => ({
        ...prevState,
        drinksCategories: fiveFirstCategories,
      }));
    }
    getDrinksCategories();
  }, []);

  useEffect(() => {
    async function getSelectedFoods() {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foods.selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      const newFoodsList = data.meals.filter((_el, i) => i < TWELVE);
      setFoods((prevState) => ({ ...prevState, renderedFoodsList: newFoodsList }));
    }
    async function getSelectedDrinks() {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinks.selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      const newDrinksList = data.drinks.filter((_el, i) => i < TWELVE);
      setDrinks((prevState) => ({ ...prevState, renderedDrinksList: newDrinksList }));
    }
    if (foods.selectedCategory.length > 0) {
      getSelectedFoods();
    } else {
      setFoods((prevState) => ({ ...prevState, renderedFoodsList: foods.foodsList }));
    }
    if (drinks.selectedCategory.length > 0) {
      getSelectedDrinks();
    } else {
      setDrinks((prevState) => ({ ...prevState, renderedDrinksList: drinks.drinksList }));
    }
  }, [
    foods.selectedCategory, drinks.selectedCategory, foods.foodsList, drinks.drinksList,
  ]);

  const contextValue = {
    foodsList: foods.renderedFoodsList,
    foodsCategories: foods.foodsCategories,
    selectedFoodsCategory: foods.selectedCategory,
    drinksList: drinks.renderedDrinksList,
    drinksCategories: drinks.drinksCategories,
    selectedDrinksCategory: drinks.selectedCategory,
    setFoods,
    setDrinks,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
