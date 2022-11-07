import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, fetchexpenses, save } from '../redux/actions';

const alimentacao = 'Alimentação';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  componentDidUpdate(prevProps) {
    const { editor, expenses, idToEdit } = this.props;
    if (editor && !prevProps.editor) {
      const findEdit = expenses.find((el) => el.id === idToEdit);
      // eu preciso pegar minha despesa do redux
      // o setState precisa se alimentar desta despesa
      this.setState({
        id: idToEdit,
        value: findEdit.value,
        description: findEdit.description,
        currency: findEdit.currency,
        method: findEdit.method,
        tag: findEdit.tag,
      });
    }
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
      tag: alimentacao,
    }));
  };

  handleEdit = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newObj = {
      value,
      description,
      currency,
      method,
      tag,
    };
    // preciso montar um novo objeto com os meus estados
    // aqui o map me da menos problemas que o filter
    dispatch(save(newObj));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="containerWallet">
        <label htmlFor="expensesValue" className="value">
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
        <label htmlFor="description" className="description">
          Descrição:
          <input
            type="text"
            className="descriptionInput"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.onInputChange }
          />
        </label>
        <br />
        <label htmlFor="currency" className="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            className="currencyInput"
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
        <label htmlFor="method" className="method">
          Método de pagamento:
          <select
            id="method"
            name="method"
            className="methodInput"
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
        <label htmlFor="tag" className="tag">
          Tag:
          <select
            id="tag"
            name="tag"
            className="tagInput"
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
        <br />
        { editor ? (
          <button
            type="button"
            className="buttonEdit1"
            data-testid="edit-btn-1"
            onClick={ this.handleEdit }
          >
            Editar Despesa
          </button>
        ) : (
          <button
            type="button"
            className="buttonDespesa"
            onClick={ this.handleButton }
          >
            Adicionar despesa
          </button>
        )}

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // Referência: https://reactjs.org/docs/typechecking-with-proptypes.html
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
