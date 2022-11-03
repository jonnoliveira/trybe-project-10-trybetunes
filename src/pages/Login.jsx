import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';

export default class Login extends Component {
  render() {
    const {
      inputNameValue,
      isDisable,
      onChangeHandler,
      isLoading,
      requestApi,
      isClicked,
    } = this.props;

    return (
      <div data-testid="page-login">
        Login
        <form>
          <fieldset>
            <div>
              <input
                type="text"
                id="inputName"
                name="inputNameValue"
                value={ inputNameValue }
                placeholder="Digite seu nome de Login"
                onChange={ onChangeHandler }
                data-testid="login-name-input"
              />
            </div>
            <button
              type="submit"
              disabled={ isDisable }
              onClick={ requestApi }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </fieldset>
        </form>
        {isLoading && (<Loading />)}
        {(isLoading === false && isClicked) && (<Redirect to="/search" />)}
      </div>
    );
  }
}

Login.propTypes = {
  inputNameValue: PropTypes.string.isRequired,
  isDisable: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  requestApi: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isClicked: PropTypes.bool.isRequired,
};
