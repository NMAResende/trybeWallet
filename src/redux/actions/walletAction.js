export const EXPENSES_USER = 'EXPENSES_USER';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';

export const expensesUser = (currencies, expenses) => ({
  type: EXPENSES_USER,
  currencies,
  expenses,
});

export const requestCurrency = () => ({ type: REQUEST_CURRENCY });

export function fetchCurrency() {
  return async (dispatch) => {
    const url = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await url.json();
    // referência: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    // ajuda do João
    const data = Object.keys(response);
    const remove = data.filter((coin) => coin !== 'USDT');
    dispatch(expensesUser(remove));
  };
}
