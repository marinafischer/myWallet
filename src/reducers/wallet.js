import {
  REQUEST_RATES,
  RECEIVE_RATES, FAILED_REQUEST, DELETE_REQUEST, EDIT_EXPENSE, SAVE_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  editingExpense: {},
  isEditing: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RATES:
    return {
      ...state,
      loading: !state.loading,
    };
  case RECEIVE_RATES:
    return {
      ...state,
      loading: !state.loading,
      expenses: [...state.expenses, {
        ...action.expense,
        id: state.expenses.length,
        exchangeRates: action.rates,
      }],
    };
  case FAILED_REQUEST:
    return {
      ...state,
      loading: !state.loading,
      error: action.error,
    };
  case DELETE_REQUEST:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editingExpense: action.editingExpense,
      isEditing: !state.isEditing,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
      editingExpense: {},
      isEditing: !state.isEditing,
    };
  default:
    return state;
  }
};

export default walletReducer;
