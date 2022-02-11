import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteRequest, editExpense } from '../actions';
import './Table.css';

class ExpensesTable extends React.Component {
  handleDelete = (e) => {
    const { expenses, deleteRequestDispatch } = this.props;
    const deleteExpenses = expenses.filter(
      (expense) => expense.id !== Number(e.target.value),
    );
    deleteRequestDispatch(deleteExpenses);
  }

  handleEdit = (e) => {
    const { expenses, editExpenseDispatch } = this.props;
    const editingExpense = expenses.find(
      (expense) => expense.id === Number(e.target.value),
    );
    editExpenseDispatch(editingExpense);
  }

  computeValues = (expense) => {
    const { currency, exchangeRates, value } = expense;
    const cotacao = parseFloat(exchangeRates[currency].ask);
    const valor = parseFloat(value);
    const total = (cotacao * valor).toFixed(2);
    const moeda = exchangeRates[currency].name.split('/')[0];
    return { cotacao, valor, total, moeda };
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="Table_Content">
        <thead className="Table_Head">
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody className="Table_Body">
          {
            expenses.map(({
              currency, description, id, method, tag, exchangeRates, value,
            }) => {
              const values = this.computeValues({ currency, exchangeRates, value });
              // const cotacao = parseFloat(exchangeRates[currency].ask);
              // console.log(exchangeRates);
              // const valor = parseFloat(value);
              // const total = (cotacao * valor).toFixed(2);
              // const moeda = exchangeRates[currency].name.split('/')[0];
              return (
                <tr key={ id }>
                  <td>
                    {description}
                  </td>
                  <td>
                    {tag}
                  </td>
                  <td>
                    {method}
                  </td>
                  <td>
                    {values.valor.toFixed(2)}
                  </td>
                  <td>
                    {values.moeda}
                  </td>
                  <td>
                    { values.cotacao.toFixed(2) }
                  </td>
                  <td>
                    { values.total }
                  </td>
                  <td>
                    Real
                  </td>
                  <td>
                    <button
                      className="edit_button"
                      value={ id }
                      type="button"
                      data-testid="edit-btn"
                      onClick={ this.handleEdit }
                    >
                      Editar
                    </button>
                    <button
                      className="delete_button"
                      value={ id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.handleDelete }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  deleteRequestDispatch: PropTypes.func.isRequired,
  editExpenseDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRequestDispatch: (expenses) => dispatch(deleteRequest(expenses)),
  editExpenseDispatch: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
