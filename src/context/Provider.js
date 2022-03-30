import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './MyContext';

function Provider({ children }) {
  const history = useHistory();
  const TWELVE = 12;
  const FIVE = 5;

  const [foods, setFoods] = useState({
    foodsList: [],
    renderedFoodsList: [],
    foodsCategories: [],
    selectedCategory: '',
    radioSearch: '',
    searchBarValue: '',
  });

  const [drinks, setDrinks] = useState({
    drinksList: [],
    renderedDrinksList: [],
    drinksCategories: [],
    selectedCategory: '',
    radioSearch: '',
    searchBarValue: '',
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

  useEffect(() => {
    async function getHeaderSelectedFoods() {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foods.searchBarValue}`;
      if (foods.radioSearch === 'Ingredient') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${foods.searchBarValue}`;
      }
      if (foods.radioSearch === 'First Letter' && foods.searchBarValue.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${foods.searchBarValue}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        const newFoodsList = data.meals.filter((_el, i) => i < TWELVE);
        if (newFoodsList.length === 1) {
          history.push(`/foods/${newFoodsList[0].idMeal}`);
        }
        setFoods((prevState) => ({ ...prevState, renderedFoodsList: newFoodsList }));
      } catch (error) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
        setFoods((prevState) => ({ ...prevState, renderedFoodsList: [] }));
      }
    }
    if (foods.searchBarValue.length > 0) {
      getHeaderSelectedFoods();
    }
  }, [foods.searchBarValue, foods.radioSearch]);

  useEffect(() => {
    async function getHeaderSelectedDrinks() {
      let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinks.searchBarValue}`;
      if (drinks.radioSearch === 'Ingredient') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinks.searchBarValue}`;
      }
      if (drinks.radioSearch === 'First Letter' && drinks.searchBarValue.length === 1) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${drinks.searchBarValue}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        const newDrinksList = data.drinks.filter((_el, i) => i < TWELVE);
        if (newDrinksList.length === 1) {
          history.push(`/drinks/${newDrinksList[0].idDrink}`);
        }
        setDrinks((prevState) => ({ ...prevState, renderedDrinksList: newDrinksList }));
      } catch (error) {
        window.alert('Sorry, we haven\'t found any recipes for these filters.');
        setDrinks((prevState) => ({ ...prevState, renderedDrinksList: [] }));
      }
    }
    if (drinks.searchBarValue.length > 0) {
      getHeaderSelectedDrinks();
    }
  }, [drinks.searchBarValue, drinks.radioSearch]);

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
