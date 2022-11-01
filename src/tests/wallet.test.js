import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Analisando a página de Login', () => {
  test('Verificar se o texto TRYBE WALLET esta impresso na tela', () => {
    renderWithRouterAndRedux(<App />);
    const text = screen.getByText(/TRYBE WALLET/i);

    expect(text).toBeInTheDocument();
  });

  test('Verificar se existe um input de email', () => {
    const INITIAL_STATE = {
      user: {
        email: 'teste@teste.com',
      },
    };

    renderWithRouterAndRedux(<Wallet />, { INITIAL_STATE });
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toHaveTextContent(email);
  });

  test('Verificar se existe um texto com o valor 0', () => {
    renderWithRouterAndRedux(<Wallet />);
    const text = screen.getByTestId('total-field');
    expect(text).toHaveTextContent('Despesa total: 0');
  });

  test('Verificar se existe um texto com o valor BRL', () => {
    renderWithRouterAndRedux(<Wallet />);
    const text = screen.getByTestId('header-currency-field');
    expect(text).toHaveTextContent('BRL');
  });

  test('Verificar se existe um input de Valor', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValor = screen.getByTestId('value-input');
    expect(inputValor).toHaveValue('0');
  });

  test('Verificar se existe um input de Descrição', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputDescricao = screen.getByTestId('description-input');
    expect(inputDescricao).toHaveValue('');
  });

  test('Verificar se existe um select de moedas', () => {
    const INITIAL_STATE = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        currencies: [
          'USD',
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
});
