import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const total = expenses
      .map((item) => +item.exchangeRates[item.currency].ask * +item.value);
    const exp = total.reduce((acc, curr) => acc + curr, 0);
    return exp.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p>
          <span data-testid="email-field">
            { email }
          </span>
        </p>
        <p>
          Despesa total:
          <span data-testid="total-field">{ this.totalExpenses() }</span>
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
