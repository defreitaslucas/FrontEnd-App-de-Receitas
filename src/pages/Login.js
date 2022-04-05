import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './Styles/Login.css';

const MAGIC_NUMBER_SIX = 6;
function Login({ history }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [buttonDisable, setButtonDisable] = useState(true);

  const validForm = () => {
    const { email, password } = login;
    const pattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true && password.length > MAGIC_NUMBER_SIX) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  const handleChangeLogin = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    if (login.email.length && login.password.length) {
      validForm();
    }
  }, [login]);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/foods');
  };

  return (
    <div className="login-page">
      <div className="login-page--form">
        <h1>
          Login
        </h1>
        <label htmlFor="email-input">
          <p>Email</p>
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ login.email }
            onChange={ handleChangeLogin }
            id="email-input"
          />
        </label>
        <label htmlFor="password-input">
          <p>Senha</p>
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ login.password }
            onChange={ handleChangeLogin }
            id="password-input"
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ buttonDisable }
          onClick={ handleClick }
        >
          Entrar

        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
