// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, EXPENSES, EXPENSES_DELETE, EXPENSES_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSES_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== +action.id),
    };
  case EXPENSES_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
      expenses: action.id,
    };
  default:
    return state;
  }
};

export default wallet;
