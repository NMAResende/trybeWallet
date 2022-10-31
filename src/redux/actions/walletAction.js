export const EXPENSES_USER = 'EXPENSES_USER';

export const expensesUser = (currencies, expenses) => ({
  type: EXPENSES_USER,
  currencies,
  expenses,
});
