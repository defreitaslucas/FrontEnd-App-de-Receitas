export const checkPath = (pathname) => (pathname
  .includes('food') ? 'meals' : 'cocktails');

export const isFoodCheckStr = (includesFood) => (includesFood ? 'foods' : 'drinks');
