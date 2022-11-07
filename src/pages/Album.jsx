import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import CardMusic from '../components/CardMusic';

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
      <div data-testid="page-album">
        <Header />
        {
          isLoading === true
            ? <Loading />
            : (
              <section>
                <div>
                  <img
                    src={ urlAlbum }
                    alt={ albumName }
                  />
                  <h3 data-testid="album-name">{ albumName }</h3>
                  <h4 data-testid="artist-name">{ artistName }</h4>
                </div>
                <ul>
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
