export const EXPENSES_USER = 'EXPENSES_USER';
export const CURRENCIES_USER = 'CURRENCIES_USER';
export const EXPENSES_DELETE = 'EXPENSES_DELETE';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';

export const expensesUser = (expenses) => ({
  type: EXPENSES_USER,
  expenses,
});

export const currenciesUser = (currencies) => ({
  type: CURRENCIES_USER,
  currencies,
});

export const expensesDelete = (expenses) => ({
  type: EXPENSES_DELETE,
  expenses,
});

export const expensesEdit = (expenses) => ({
  type: EXPENSES_EDIT,
  expenses,
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
    console.log(response);
  };
}
