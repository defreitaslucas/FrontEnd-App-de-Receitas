import React from 'react';
// import { getFavoriteRecipes } from '../helpers/localStorage';

export default function FavoriteRecipesScreen() {
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // const getInitialData = useCallback(() => {
  //   const recipes = getFavoriteRecipes();
  //   setFavoriteRecipes(recipes);
  // }, []);

  // useEffect(() => {
  //   getInitialData();
  // }, [getInitialData]);

  // const renderRecipeCards = () => {
  //   return favoriteRecipes.map(({ id, type, nationality, category,
  //     alcoholicOrNot, name, image }) => (
  //       <div>

  //       </div>
  //     ));
  // };

  return (
    <main id="favorite-recipes-main" className="favorite-recipes-main">
      <nav>
        <button
          type="button"
          className="filter-by-all-btn"
          value="all"
          data-testid="filter-by-all-btn"
        >
          All;
        </button>

        <button
          type="button"
          className="filter-by-food-btn"
          value="food"
          data-testid="filter-by-food-btn"
        >
          Foods;
        </button>

        <button
          type="button"
          className="filter-by-drink-btn"
          value="drink"
          data-testid="filter-by-drink-btn"
        >
          Drinks;
        </button>
      </nav>
      {/* <section>
        {renderRecipeCards()}
      </section> */}
    </main>
  );
}
