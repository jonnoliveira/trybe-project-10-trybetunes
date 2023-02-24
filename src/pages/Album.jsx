import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import CardMusic from '../components/CardMusic';
import iconArtist from '../helpers/icon-artist.svg';
import '../css/Album.css';

export default class Album extends Component {
  state = {
    musicsList: [],
    isLoading: true,
    albumName: '',
    artistName: '',
    urlAlbum: '',
  };

  componentDidMount() {
    this.getMusicList();
  }

  getMusicList = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);

    const { artistName, collectionName, artworkUrl100 } = musics[0];
    this.setState({
      musicsList: musics,
      isLoading: false,
      albumName: collectionName,
      artistName,
      urlAlbum: artworkUrl100,
    });
  };

  render() {
    const { musicsList,
      isLoading,
      albumName,
      artistName,
      urlAlbum } = this.state;

    return (
      <div data-testid="page-album" className='album-container'>
        <Header />
        {
          isLoading === true
            ? 
              (
                <div className='loading'>
                  <Loading />
                </div>
              )
            : (
              <section className='album-musics-container'>
                <div className='album-artist-image-container'>
                  <div className='image-album-container'>
                    <img
                      src={ urlAlbum }
                      alt={ albumName }
                    />
                    <h3 data-testid="album-name">{ albumName }</h3>
                  </div>
                  <div className='icon-artist-container'>
                    <img src={ iconArtist } alt="" />
                    <h4 data-testid="artist-name">{ artistName }</h4>
                  </div>
                </div>
                <ul className='album-music-list'>
                  { musicsList.slice(1).map((music) => (
                    <CardMusic
                      key={ music.trackNumber }
                      music={ music }
                    />)) }
                </ul>
              </section>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
