// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES_USER,
  EXPENSES_DELETE,
  EXPENSES_EDIT,
  EXPENSES_USER
} from '../actions/walletAction';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES_USER:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case CURRENCIES_USER:
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
      expenses: action.id,
    };
  default:
    return state;
  }
};

export default wallet;
