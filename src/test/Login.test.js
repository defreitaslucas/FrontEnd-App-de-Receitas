import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testing the Login component', () => {
  it('Check if there is description of the input fields', () => {
    const { getByText } = renderWithRouter(<App />);

    const labelEmail = getByText('Email');
    const labelPassword = getByText('Senha');

    expect(labelEmail && labelPassword).toBeInTheDocument();
  });
  it('Check if there are two entries for email and password', () => {
    const { getByRole } = renderWithRouter(<App />);

    const inputEmail = getByRole('textbox', { label: /email/i });
    const inputPassword = getByRole('textbox', { label: /password/i });

    expect(inputEmail && inputPassword).toBeInTheDocument();
  });
  it('Check if there is a button to access the app', () => {
    const { getByRole } = renderWithRouter(<App />);

    const enterButton = getByRole('button', { name: /entrar/i });

    expect(enterButton).toBeInTheDocument();
  });
  it('Check if there is text indicating the page', () => {
    const { getByRole } = renderWithRouter(<App />);

    const screenHeading = getByRole('heading', { name: /login/i, level: 1 });

    expect(screenHeading).toBeInTheDocument();
  });
  it('check if clicking the button redirects to /foods', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const emailTest = 'test.trybe@test.com';
    const passwordTest = '123456789';

    const enterButton = getByRole('button', { name: /entrar/i });
    const inputEmail = getByRole('textbox', { label: /email/i });
    const inputPassword = getByRole('textbox', { label: /password/i });

    userEvent.type(inputEmail, emailTest);
    expect(inputEmail).toHaveValue(emailTest);

    userEvent.type(inputPassword, passwordTest);
    expect(inputPassword).toHaveValue(passwordTest);

    userEvent.click(enterButton, history.push('./foods'));
    expect(history.location.pathname).toEqual('/foods');
  });
});
