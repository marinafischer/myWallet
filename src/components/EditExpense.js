import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEditedExpense } from '../actions';
import './Expenses.css';

class EditExpenses extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      description: '',
      exchangeRates: {},
      currencyOptions: [],
    };
  }

  async componentDidMount() {
    await this.getCurrencyOption();
  }

  getCurrencyOption = async () => {
    const { editingExpense: {
      value, currency, method, tag, description, exchangeRates, id } } = this.props;
    const currencyOptions = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((responde) => responde.json())
      .then((rates) => Object.keys(rates))
      .catch((e) => console.error(e));
    this.setState({
      value, currency, method, tag, description, currencyOptions, exchangeRates, id,
    });
  }

  hadleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatchEditedExpense, expenses } = this.props;
    const {
      value, currency, method, tag, description, exchangeRates, id,
    } = this.state;
    const filterExpenses = expenses.filter(
      (expense) => expense.id !== Number(id),
    );
    const expense = {
      value, currency, method, tag, description, exchangeRates, id };
    const orderedExpenses = [...filterExpenses, expense].sort(
      (expenseA, expenseB) => expenseA.id - expenseB.id,
    );
    dispatchEditedExpense(orderedExpenses);
  }

  render() {
    const { value, currency, method, tag, description, currencyOptions } = this.state;
    return (
      <div className="Form_Content Editing">
        <h1 className="Form_Content_Title"> Editar Despesa:</h1>
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
            Forma de Pagamento
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
            Categoria
            <select
              className="Form_Input"
              id="tag-input"
              name="tag"
              data-testid="tag-input"
              onChange={ this.hadleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
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
            className="Form_Button Edit"
            data-testid="edit-btn"
            type="button"
            onClick={ this.handleClick }
          >
            Editar Despesa
          </button>
        </form>
      </div>
    );
  }
}

EditExpenses.propTypes = {
  editingExpense: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatchEditedExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEditedExpense: (expenses) => dispatch(saveEditedExpense(expenses)),
});

const mapStateToProps = (state) => ({
  editingExpense: state.wallet.editingExpense,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenses);
