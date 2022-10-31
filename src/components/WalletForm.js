import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions/walletAction';

class WalletForm extends React.Component {
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

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenses">
          Valor:
          <input
            type="text"
            className="expenses"
            id="expenses"
            name="expenses"
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
        <label htmlFor="pay">
          Método de pagamento
          <select
            id="pay"
            name="pay"
            className="pay"
            type="select"
            data-testid="method-input"
            onChange={ this.onInputChange }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao de credito">Cartão de crédito</option>
            <option value="cartao de debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            id="tag"
            name="tag"
            className="tag"
            type="select"
            data-testid="tag-input"
            onChange={ this.onInputChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <button
          type="button"
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
});

export default connect(mapStateToProps)(WalletForm);
