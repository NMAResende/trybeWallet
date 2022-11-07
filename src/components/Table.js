import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expensesDelete, expensesEdit } from '../redux/actions';

class Table extends Component {
  DeleteButton = (id) => {
    const { dispatch } = this.props;
    dispatch(expensesDelete(id));
  };

  toEditButton = (idToEdit) => {
    const { dispatch } = this.props;
    dispatch(expensesEdit(idToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>|</th>
              <th>Tag</th>
              <th>|</th>
              <th>Método de pagamento</th>
              <th>|</th>
              <th>Valor</th>
              <th>|</th>
              <th>Moeda</th>
              <th>|</th>
              <th>Câmbio utilizado</th>
              <th>|</th>
              <th>Valor convertido</th>
              <th>|</th>
              <th>Moeda de conversão</th>
              <th>|</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((coin) => (
              <tr key={ coin.id }>
                <td>{ coin.description }</td>
                <td>|</td>
                <td>{ coin.tag }</td>
                <td>|</td>
                <td>{coin.method }</td>
                <td>|</td>
                <td>{ (+coin.value).toFixed(2) }</td>
                <td>|</td>
                <td>{ coin.exchangeRates[coin.currency].name }</td>
                <td>|</td>
                <td>
                  {
                    (+coin.exchangeRates[coin.currency].ask * +coin.value)
                      .toFixed(2)
                  }
                </td>
                <td>|</td>
                <td>{ (+coin.exchangeRates[coin.currency].ask).toFixed(2) }</td>
                <td>|</td>
                <td>Real</td>
                <td>|</td>
                <td>
                  <button
                    type="button"
                    className="buttonEdit"
                    data-testid="edit-btn"
                    onClick={ () => this.toEditButton(coin.id) }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    className="buttonDelete"
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
