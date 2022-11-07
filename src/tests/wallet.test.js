import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const valueInput = 'value-input';
const descriptionInput = 'description-input';
const Alimentacao = 'Alimentação';

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
    const inputValor = screen.getByTestId(valueInput);
    userEvent.type(inputValor, '50,00');

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(button);
    userEvent.clear(inputValor);
  });

  test('Verificar se existe um input de Descrição', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputDescricao = screen.getByTestId(descriptionInput);
    userEvent.type(inputDescricao, 'Hamburguer');

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(button);
    userEvent.clear(inputDescricao);
  });

  test('Verificar se existe um select de moedas', async () => {
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
    // ajuda do Tiago
    await waitFor(() => {
      expect(inputMoeda).toHaveValue('USD');
    });
  });

  test('Verificar se existe um select de método de pagamento', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputPay = screen.getByTestId('method-input');
    expect(inputPay).toHaveValue('Dinheiro');
  });

  test('Verificar se existe um select de tag', () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputTag = screen.getByTestId('tag-input');
    expect(inputTag).toHaveValue(Alimentacao);
  });

  test('Verificar se existe um botão clicavel na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(button).toBeInTheDocument();
  });

  test('Verificar se existe uma tabela impresa na tela', () => {
    renderWithRouterAndRedux(<Wallet />);
    const description = screen.getByTestId(valueInput);
    const value = screen.getByTestId(descriptionInput);
    const method = screen.getByRole('option', { name: /dinheiro/i });
    const tag = screen.getByRole('option', { name: /alimentação/i });
    const table = screen.getByRole('table');

    userEvent.type(description, 'Hamburguer');
    userEvent.type(value, '50,00');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, Alimentacao);

    const button = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(button);
    expect(table).toBeVisible();
  });

  test('Verificar se existe um botão de excluir nas despesas', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const description = screen.getByTestId(valueInput);
    const value = screen.getByTestId(descriptionInput);
    const method = screen.getByRole('option', { name: /dinheiro/i });
    const tag = screen.getByRole('option', { name: /alimentação/i });
    const table = screen.getByRole('table');

    userEvent.type(description, 'Hamburguer');
    userEvent.type(value, '50,00');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, Alimentacao);

    const buttonAdd = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(buttonAdd);
    expect(table).toBeVisible();

    // ajuda do Tiago
    await waitFor(() => {
      const buttonDelete = screen.getByRole('button', { name: /excluir/i });
      userEvent.click(buttonDelete);
    });
  });

  test('Verificar se existe um botão de editar na tela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const description = screen.getByTestId(valueInput);
    const value = screen.getByTestId(descriptionInput);
    const method = screen.getByRole('option', { name: /dinheiro/i });
    const tag = screen.getByRole('option', { name: /alimentação/i });
    const table = screen.getByRole('table');

    userEvent.type(description, 'Hamburguer');
    userEvent.type(value, '50,00');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, Alimentacao);

    const buttonAdd = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(buttonAdd);
    expect(table).toBeVisible();

    const buttonEdit = await screen.findByRole('button', { name: /Editar despesa/i });
    userEvent.click(buttonEdit);
    expect(buttonAdd).toHaveTextContent(/Editar despesa/i);
  });

  test('Verificar se aparece um botão de editar na tela para conclução da edição', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const description = screen.getByTestId(valueInput);
    const value = screen.getByTestId(descriptionInput);
    const method = screen.getByRole('option', { name: /dinheiro/i });
    const tag = screen.getByRole('option', { name: /alimentação/i });
    const table = screen.getByRole('table');

    userEvent.type(description, 'Hamburguer');
    userEvent.type(value, '50,00');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(tag, Alimentacao);

    const buttonAdd = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(buttonAdd);
    expect(table).toBeVisible();

    const buttonEdit = await screen.findByTestId('edit-btn');
    userEvent.click(buttonEdit);

    const buttonSave = await screen.findByTestId('edit-btn-1');
    userEvent.click(buttonSave);
  });
});
