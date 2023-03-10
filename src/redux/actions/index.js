export const EXPENSES = 'EXPENSES';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSES_DELETE = 'EXPENSES_DELETE';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';
export const USER_EMAIL = 'USER_EMAIL';
export const SAVE = 'SAVE';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const expensesUser = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const currenciesUser = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const expensesDelete = (id) => ({
  type: EXPENSES_DELETE,
  id,
});

export const expensesEdit = (idToEdit) => ({
  type: EXPENSES_EDIT,
  idToEdit,
});

export const save = (expense) => ({
  type: SAVE,
  expense,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const url = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await url.json();
    // referência: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    // ajuda do João
    const data = Object.keys(response);
    const remove = data.filter((coin) => coin !== 'USDT');
    dispatch(currenciesUser(remove));
  };
}

export function fetchexpenses(state) {
  return async (dispatch) => {
    const url = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await url.json();
    const data = { ...state, exchangeRates: response };
    dispatch(expensesUser(data));
  };
}
