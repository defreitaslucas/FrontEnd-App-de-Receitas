import React, { useEffect } from 'react';

function RecipesInProgress() {
  useEffect(() => {
    const getLocalStorage = () => {
      const resultado = localStorage.getItem('inProgressRecipes');
      return resultado;
    };
    getLocalStorage();
    // if (resultado.cocktails.length) {

    // } else if (resultado.meals.length) {

    // }
  }, []);
  return (
    <div>RecipesInProgress</div>

  );
}

export default RecipesInProgress;
