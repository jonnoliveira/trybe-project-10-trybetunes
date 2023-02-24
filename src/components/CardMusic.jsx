import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import iconMusic from '../helpers/icon-music.svg';
import '../css/CardMusic.css';

export default class CardMusic extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  async componentDidMount() {
    this.favoriteMusics();
  }

  favoriteMusics = async () => {
    // this.setState({ isLoading: true }, async () => {
      const favoritesMusics = await getFavoriteSongs();
      const { music } = this.props;

      favoritesMusics.filter((fMusic) => (
        fMusic.trackId === music.trackId && this.setState({
          isChecked: true })));
      // this.setState({ isLoading: false });
    // });
  };

  onChangeHandler = ({ target }) => {
    const { checked } = target;
    this.setState({
      isChecked: checked,
    }, async () => {
      const { music } = this.props;
      const { isChecked } = this.state;

      if (isChecked) {
        await addSong(music);
      } else {
        await removeSong(music);
        this.favoriteMusics();
      }
    });
  };

  render() {
    const { music } = this.props;
    const { previewUrl, trackName, trackId } = music;
    const { isLoading, isChecked } = this.state;

    return (
      <div className='cardMusic-container'>
        {
          isLoading === true
            ? <Loading />
            : (
              <li className='cardMusic-list-container'>
                <div className='cardMusic-icon-trackname-label-container'>
                  <div className='icon-trackname-container'>
                    <img src={ iconMusic } alt="Music icon" />
                    <p>{trackName}</p>
                  </div>
                  <div className='custom-checkbox'>
                    <label htmlFor={ trackId }>
                      <input
                        type="checkbox"
                        name="isChecked"
                        id={ trackId }
                        checked={ isChecked }
                        onChange={ this.onChangeHandler }
                        data-testid={ `checkbox-music-${trackId}` }
                        className='checkbox-heart'
                      />
                      
                    </label>
                  </div>
                </div>
                <audio data-testid="audio-component" src={ previewUrl } controls className='cardMusic-audio'>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>                
              </li>
            )
        }
      </div>
    );
  }
}

CardMusic.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
    trackId: PropTypes.number,
  }).isRequired,
};
