import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUserAction } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
    };
  }

  hadleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.checkInputs());
  };

  checkInputs = () => {
    const { email, senha } = this.state;
    const SENHA_LENGTH = 6;
    // fonte: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email) && senha.length >= SENHA_LENGTH) {
      return this.setState({
        isDisabled: false,
      });
    }
    this.setState({ isDisabled: true });
  }

  handleClick = () => {
    const { history: { push }, saveUserDispatch } = this.props;
    const { email, senha } = this.state;
    saveUserDispatch({ email, senha });
    return push('/carteira');
  };

  render() {
    const { email, senha, isDisabled } = this.state;
    return (
      <form className="Form_Fild">
        <h1 className="Login_Title">Minha carteira</h1>
        <input
          className="Login_Input"
          name="email"
          type="email"
          placeholder="email"
          data-testid="email-input"
          onChange={ this.hadleChange }
          value={ email }
        />
        <input
          className="Login_Input"
          name="senha"
          type="password"
          placeholder="senha"
          data-testid="password-input"
          onChange={ this.hadleChange }
          value={ senha }
        />
        <button
          className="Login_Button"
          type="button"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUserDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserDispatch: (user) => dispatch(saveUserAction(user)),
});

export default connect(null, mapDispatchToProps)(Login);
