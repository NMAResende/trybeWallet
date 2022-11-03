import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expensesDelete, expensesEdit } from '../redux/actions/walletAction';

class Table extends Component {
  DeleteButton = async () => {
    const { expenses, dispatch } = this.props;
    const del = expenses.filter((item) => item.id !== expenses.id);
    dispatch(expensesDelete(del));
  };

  toEditButton = () => {
    const { expenses, dispatch } = this.props;
    dispatch(expensesEdit(expenses.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((coin) => (
              <tr key={ coin.id }>
                <td>{ coin.description }</td>
                <td>{ coin.tag }</td>
                <td>{coin.method }</td>
                <td>{ (+coin.value).toFixed(2) }</td>
                <td>{ coin.exchangeRates[coin.currency].name }</td>
                <td>
                  {
                    (+coin.exchangeRates[coin.currency].ask * +coin.value)
                      .toFixed(2)
                  }
                </td>
                <td>{ (+coin.exchangeRates[coin.currency].ask).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ this.toEditButton }
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.DeleteButton }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
