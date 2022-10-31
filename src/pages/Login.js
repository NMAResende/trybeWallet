import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions/userAction';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      submit: false,
    };
  }

  handleButton = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  validando = () => {
    const { email, password } = this.state;
    const numberMinPassword = 6;
    // Referência: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const validEmail = /\S+@\S+\.\S+/;
    const validPassword = password.length >= numberMinPassword;
    this.setState({ submit: email.match(validEmail) && validPassword });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, this.validando);
  };

  render() {
    const { email, password, submit } = this.state;
    return (
      <div data-testid="page-login">
        <div>
          Login
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha (mínimo 6 caracteres):
            <input
              type="password"
              name="password"
              id="password"
              value={ password }
              minLength="6"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ !submit }
            onClick={ this.handleButton }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
