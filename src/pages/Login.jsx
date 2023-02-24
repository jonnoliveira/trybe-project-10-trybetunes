import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import '../css/Login.css';

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
      <div data-testid="page-login" className='login-page'>
        <form className='container-login'>
          <div className='title-login'>
            <h1>Trybe</h1>
            <h2>Tunes</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/5695/5695034.png" alt="music icon" />
          </div>
          <input
            type="text"
            id="inputName"
            name="inputNameValue"
            value={ inputNameValue }
            placeholder="Qual seu nome?"
            onChange={ onChangeHandler }
            data-testid="login-name-input"
            className='name-login'
          />
          <button
            type="submit"
            disabled={ isDisable }
            onClick={ requestApi }
            data-testid="login-submit-button"
            className='btn-login'
           >
            Entrar
          </button>
        </form>
        {
          isLoading
            &&
            (
              <div className='login-loading'>
                <Loading />
              </div>
            )
        }
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
