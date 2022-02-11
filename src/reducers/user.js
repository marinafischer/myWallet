// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  senha: '',
};

const userReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return action.user;
  default:
    return state;
  }
};

export default userReduce;
