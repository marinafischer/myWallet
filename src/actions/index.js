// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_RATES = 'REQUEST_RATES';
export const RECEIVE_RATES = 'RECEIVE_RATES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const EDIT_EXPENSE = 'EDIT_REQUEST';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_REQUEST';

export const editExpense = (editingExpense) => ({
  type: EDIT_EXPENSE,
  editingExpense,
});

export const saveEditedExpense = (expenses) => ({
  type: SAVE_EDIT_EXPENSE,
  expenses,
});

export const saveUserAction = (user) => ({
  type: SAVE_USER,
  user,
});

export const deleteRequest = (expenses) => ({
  type: DELETE_REQUEST,
  expenses,
});

const requestRates = () => ({
  type: REQUEST_RATES,
});

const receiveRates = (expense, rates) => ({
  type: RECEIVE_RATES,
  expense,
  rates,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export function fetchRates(expense) {
  return (dispatch) => {
    dispatch(requestRates());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((responde) => responde.json())
      .then((rates) => dispatch(receiveRates(expense, rates)))
      .catch((e) => dispatch(failedRequest(e)));
  };
}
