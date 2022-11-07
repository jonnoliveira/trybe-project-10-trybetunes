import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class CardMusic extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  onChangeHandler = ({ target }) => {
    const { checked } = target;
    this.setState({
      isLoading: true,
      isChecked: checked,
    }, async () => {
      const { music } = this.props;
      const trackId = target.parentNode.parentNode.children[2].children[0].id;
      const favMusic = music[trackId];

      await addSong(favMusic);
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { music } = this.props;
    const { previewUrl, trackName, trackId } = music;
    const { isLoading, isChecked } = this.state;

    return (
      <div>
        {
          isLoading === true
            ? <Loading />
            : (
              <li>
                <p>
                  {trackName}
                </p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

                <label htmlFor={ trackId }>
                  <input
                    type="checkbox"
                    name="isChecked"
                    id={ trackId }
                    checked={ isChecked }
                    onChange={ this.onChangeHandler }
                    data-testid={ `checkbox-music-${trackId}` }
                  />
                </label>
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
