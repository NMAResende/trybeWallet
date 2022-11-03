import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Analisando a página Wallet', () => {
  test('Verificar se o texto TRYBE WALLET esta impresso na tela', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/TRYBE WALLET/i);

    expect(text).toBeInTheDocument();
  });

  test('Verificar se existe um input de email', () => {
    const emailLog = 'teste@teste.com';

    const { history } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeDisabled();

    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, emailLog);
    const inputSenha = screen.getByTestId('password-input');
    userEvent.type(inputSenha, '123456');

    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const email = screen.getByTestId('email-field');
    expect(email).toBeVisible();
    expect(email).toHaveTextContent(emailLog);
  });

  test('Verificar se existe um texto com o valor 0', () => {
    renderWithRouterAndRedux(<Wallet />);
    const text = screen.getByTestId('total-field');
    expect(text).toHaveTextContent('0.00');
  });

  test('Verificar se existe um texto com o valor BRL', () => {
    renderWithRouterAndRedux(<Wallet />);
    const text = screen.getByTestId('header-currency-field');
    expect(text).toHaveTextContent('BRL');
  });

  test('Verificar se existe um input de Valor', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValor = screen.getByTestId('value-input');
    userEvent.type(inputValor, '50,00');

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(button);
    userEvent.clear(inputValor);
  });

  test('Verificar se existe um input de Descrição', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputDescricao = screen.getByTestId('description-input');
    userEvent.type(inputDescricao, 'Hamburguer');

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(button);
    userEvent.clear(inputDescricao);
  });

  test('Verificar se existe um select de moedas', () => {
    const INITIAL_STATE = {
      wallet: {
        currencies: [
          'USD',
          'CAD',
          'GBP',
          'ARS',
          'BTC',
          'LTC',
          'EUR',
          'JPY',
          'CHF',
          'AUD',
          'CNY',
          'ILS',
          'ETH',
          'XRP',
          'DOGE',
        ],
      },
    };

    renderWithRouterAndRedux(<Wallet />, { INITIAL_STATE });
    const inputMoeda = screen.getByTestId('currency-input');
    expect(inputMoeda).toHaveValue('USD');
  });

  test('Verificar se existe um select de método de pagamento', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputPay = screen.getByTestId('method-input');
    expect(inputPay).toHaveValue('Dinheiro');
  });

  test('Verificar se existe um select de tag', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toHaveValue('Alimentação');
  });

  test('Verificar se existe um botão clicavel na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(button).toBeInTheDocument();
  });

  test('Verificar se existe uma tabela impresa na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const description = screen.getByTestId('value-input');
    const value = screen.getByTestId('description-input');
    const method = screen.getByRole('option', { name: /dinheiro/i });
    const tag = screen.getByRole('option', { name: /alimentação/i });
    const table = screen.getByRole('table');

    userEvent.type(description, 'Hamburguer');
    userEvent.type(value, '50,00');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, 'Alimentação');

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(button);
    expect(table).toBeVisible();
  });
});
