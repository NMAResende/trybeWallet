import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, fetchexpenses } from '../redux/actions/walletAction';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  onInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const check = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: check,
    });
  };

  handleButton = async () => {
    const { dispatch } = this.props;
    dispatch(fetchexpenses(this.state));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }));
  };

  // saveInfoButton = () => {
  //   const { dispatch } = this.props;
  //   dispatch(expensesUser(this.state));

  // };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="expensesValue">
          Valor:
          <input
            type="text"
            className="expensesValue"
            id="expensesValue"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            className="description"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            className="currency"
            type="select"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.onInputChange }
          >
            {currencies.map((coin, i) => (
              <option
                key={ i }
              >
                {coin}

              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            name="method"
            className="method"
            value={ method }
            type="select"
            data-testid="method-input"
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            name="tag"
            className="tag"
            value={ tag }
            type="select"
            data-testid="tag-input"
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // Referência: https://reactjs.org/docs/typechecking-with-proptypes.html
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
