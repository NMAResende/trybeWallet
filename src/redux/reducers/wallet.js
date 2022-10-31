// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSES_USER, REQUEST_CURRENCY } from '../actions/walletAction';

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
      expenses: action.expenses,
      currencies: action.currencies,
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
