import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    inputArtist: '',
    isDisabledSearch: true,
  };

  btnLoginValidationSearch = () => {
    const { inputArtist } = this.state;
    const maxCaract = 2;

    if (inputArtist.length >= maxCaract) {
      this.setState({ isDisabledSearch: false });
    }
  };

  onChangeHandlerSearch = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.btnLoginValidationSearch();
    });
  };

  render() {
    const {
      inputArtist,
      isDisabledSearch,
    } = this.state;

    return (
      <div data-testid="page-search">
        Search
        <Header />
        <div>
          <form action="">
            <input
              type="text"
              name="inputArtist"
              id="inputArtist"
              value={ inputArtist }
              onChange={ this.onChangeHandlerSearch }
              data-testid="search-artist-input"
            />
          </form>
          <button
            type="submit"
            disabled={ isDisabledSearch }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
