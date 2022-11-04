import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

export default class CardAlbums extends Component {
  render() {
    const { album } = this.props;
    const { collectionId, artworkUrl100, collectionName, trackCount } = album;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        />
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>
          { collectionName }
        </h3>
        <p>
          Músicas no álbum:
          { trackCount }
        </p>
      </div>
    );
  }
}

CardAlbums.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};
