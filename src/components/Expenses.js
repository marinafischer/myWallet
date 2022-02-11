import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRates } from '../actions';
import './Expenses.css';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      description: '',
      currencyOptions: [],
    };
  }

  async componentDidMount() {
    await this.getCurrencyOption();
  }

  getCurrencyOption = async () => {
    const currencyOptions = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((responde) => responde.json())
      .then((rates) => Object.keys(rates))
      .catch((e) => console.error(e));
    this.setState({ currencyOptions });
  }

  hadleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatchRates } = this.props;
    const { value, currency, method, tag, description } = this.state;
    dispatchRates({ value, currency, method, tag, description });
    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description, currencyOptions } = this.state;
    return (
      <div className="Form_Content">
        <h1 className="Form_Content_Title"> Adicionar Despesa:</h1>
        <form className="Form_Content_Body">
          <label htmlFor="value-input" className="Form_Label">
            Valor:
            <input
              className="Form_Input Number"
              type="number"
              name="value"
              data-testid="value-input"
              onChange={ this.hadleChange }
              value={ value }
            />
          </label>
          <label htmlFor="currency-input" className="Form_Label">
            Moeda:
            <select
              className="Form_Input"
              id="currency-input"
              name="currency"
              data-testid="currency-input"
              onChange={ this.hadleChange }
              value={ currency }
            >
              {
                currencyOptions.map((current) => current !== 'USDT' && (
                  <option
                    key={ current }
                    data-testid={ current }
                  >
                    {current}
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input" className="Form_Label">
            Forma de Pagamento:
            <select
              className="Form_Input"
              id="method-input"
              name="method"
              data-testid="method-input"
              onChange={ this.hadleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input" className="Form_Label">
            Categoria:
            <select
              className="Form_Input"
              id="tag-input"
              name="tag"
              data-testid="tag-input"
              onChange={ this.hadleChange }
              value={ tag }
            >
              <option
                className="Form_Input Select"
                value="Alimentação"
              >
                Alimentação
              </option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="value-input" className="Form_Label">
            Descrição:
            <input
              className="Form_Input Description"
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.hadleChange }
              value={ description }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            className="Form_Button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

Expenses.propTypes = {
  dispatchRates: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchRates: (state) => dispatch(fetchRates(state)),
});

export default connect(null, mapDispatchToProps)(Expenses);
