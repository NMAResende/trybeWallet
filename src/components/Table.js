import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expensesDelete, expensesEdit } from '../redux/actions/walletAction';

class Table extends Component {
  DeleteButton = (id) => {
    const { dispatch } = this.props;
    dispatch(expensesDelete(id));
  };

  toEditButton = (expenses) => {
    const { dispatch } = this.props;
    dispatch(expensesEdit(expenses));
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
                    onClick={ () => this.toEditButton(coin) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.DeleteButton(coin.id) }
                    id={ coin.id }
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
