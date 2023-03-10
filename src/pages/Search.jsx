import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardAlbums from '../components/CardAlbums';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/Search.css';

let artist = '';

export default class Search extends Component {
  state = {
    inputArtist: '',
    isDisabledSearch: true,
    albumList: [],
    isLoading: false,
  };

  btnLoginValidationSearch = () => {
    const { inputArtist } = this.state;
    const maxCaract = 2;

    if (inputArtist.length >= maxCaract) {
      this.setState({ isDisabledSearch: false });
    } else {
      this.setState({ isDisabledSearch: true });
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

  searchBtn = async () => {
    const { inputArtist } = this.state;
    artist = inputArtist;

    this.setState({ isLoading: true });

    if (inputArtist) {
      const albumInfo = await searchAlbumsAPI(inputArtist);
      this.setState({
        albumList: albumInfo,
        isLoading: false,
      });
    }

    this.setState({ inputArtist: '' });
  };

  render() {
    const {
      inputArtist,
      isDisabledSearch,
      albumList,
      isLoading,
    } = this.state;

    return (
      <div data-testid="page-search" className='page-search'>
        <Header />
        <div className='container-search'>
          <form action="" className='forms-search'>
            <input
              type="text"
              name="inputArtist"
              id="inputArtist"
              value={ inputArtist }
              onChange={ this.onChangeHandlerSearch }
              data-testid="search-artist-input"
              className='inputArtist'
              placeholder='Nome do artista'
            />
            <button
              type="button"
              disabled={ isDisabledSearch }
              onClick={ this.searchBtn }
              data-testid="search-artist-button"
              className='search-btn'
            >
              Pesquisar
            </button>
          </form>
        </div>
        {
          isLoading === true
            &&
            (
              <div className='loading'>
                <Loading />
              </div>
            )
        }
        {
          (isLoading === false && albumList.length === 0)
          && (
            <div className='container-search-notFound'>
              <img src="https://cdn-icons-png.flaticon.com/512/6665/6665325.png" alt="Error icon" />
              <h3>
                Desculpe! Nenhum álbum foi encontrado.
              </h3>
            </div>
          )
        }
        {
          (isLoading === false && albumList.length > 0)
            && (
              <div className="container-search-found">
                <h3 className="search-found-artist">
                  { `Artista: ${artist}`}
                </h3>
                <ul className='search-found-list'>
                  { albumList.map((album) => (
                    <CardAlbums key={ album.collectionId } album={ album } />
                  ))}
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}
