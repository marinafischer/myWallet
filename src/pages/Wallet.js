import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import ExpensesTable from '../components/ExpensesTable';
import EditExpense from '../components/EditExpense';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <Header />
        { isEditing ? <EditExpense /> : <Expenses /> }
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Wallet);
