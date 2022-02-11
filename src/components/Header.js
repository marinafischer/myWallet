import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const cotacao = exchangeRates[currency] ? exchangeRates[currency].ask : 1;
      return acc + Number(value) * cotacao;
    }, 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className="Header_Content">
        <div className="User_data">
          <span>
            {'Olá '}
          </span>
          <span data-testid="email-field">
            { email }
          </span>
        </div>
        <div className="Wallet_data">
          <span>
            {'Total:  '}
            <span data-testid="total-field" className="Wallet_total">
              { this.totalExpenses() }
            </span>
            <span data-testid="header-currency-field">
              {' R$ '}
            </span>
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
