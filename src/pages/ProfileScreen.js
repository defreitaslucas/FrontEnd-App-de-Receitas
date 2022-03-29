import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserData } from '../helpers/localStorage';

export default function ProfileScreen({ history }) {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const userStoredData = getUserData();
    setUserData(userStoredData);
    console.log(userStoredData);
  }, [setUserData]);

  return (
    <main id="profile-page" className="profile-page">
      <header>
        <p data-testid="profile-email">
          { userData.email }
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => { localStorage.clear(); history.push('/'); } }
        >
          Logout
        </button>
      </header>
    </main>
  );
}

ProfileScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};