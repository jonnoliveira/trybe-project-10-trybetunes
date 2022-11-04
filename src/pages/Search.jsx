import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardAlbums from '../components/CardAlbums';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
            onClick={ this.searchBtn }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
        {
          isLoading === true
            && <Loading />
        }
        {
          (isLoading === false && albumList.length === 0)
          && (
            <div>
              <h3>
                Nenhum álbum foi encontrado
              </h3>
            </div>
          )
        }
        {
          (isLoading === false && albumList.length > 0)
            && (
              <div>
                <h3>
                  { `Resultado de álbuns de: ${artist}`}
                </h3>
                { albumList.map((album) => (
                  <CardAlbums key={ album.collectionId } album={ album } />
                ))}
              </div>
            )
        }
      </div>
    );
  }
}
