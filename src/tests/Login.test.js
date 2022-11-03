import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Analisando a página de Login', () => {
  test('Verificar se o texto TRYBE WALLET esta impresso na tela', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/TRYBE WALLET/i);

    expect(text).toBeInTheDocument();
  });

  test('Verificar se existe um input de email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByText(/Email:/i);
    userEvent.type(inputEmail, 'teste@teste.com');
    expect(inputEmail).toBeInTheDocument();
  });

  test('Verificar se existe um input de senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputSenha = screen.getByText(/Senha:/i);
    userEvent.type(inputSenha, '123456');
    expect(inputSenha).toBeInTheDocument();
  });

  test('Verificar se existe um botão clicavel na tela e se redireciona para a página /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeDisabled();

    const inputEmail = screen.getByText(/Email:/i);
    userEvent.type(inputEmail, 'teste@teste.com');
    const inputSenha = screen.getByText(/Senha:/i);
    userEvent.type(inputSenha, '123456');

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
