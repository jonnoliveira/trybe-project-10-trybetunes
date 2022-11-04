import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CardMusic extends Component {
  render() {
    const { music } = this.props;
    const { previewUrl, trackName } = music;

    return (
      <li>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </li>
    );
  }
}

CardMusic.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    // trackNumber: PropTypes.number,
  }).isRequired,
};
