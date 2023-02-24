import React, { Component } from 'react';
import '../css/NotFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className='notfound-container'>
        <div className='notfound-alert-items'>
          <img src="https://cdn-icons-png.flaticon.com/512/9813/9813497.png" alt="not found icon" />
          <h1>
            Oops!
          </h1>
          <h2>
            Page Not Found
          </h2>
          <p>
            Página não encontrada. Será que estamos no caminho correto?
          </p>
        </div>
      </div>
    );
  }
}
