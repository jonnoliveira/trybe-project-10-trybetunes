import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

export default class CardAlbums extends Component {
  render() {
    const { album } = this.props;
    const { collectionId, artworkUrl100, collectionName, trackCount } = album;
    return (
      <li>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3>
            { `Álbum: ${collectionName}`}
          </h3>
          <p>
            { `Musícas no álbum: ${trackCount}`}
          </p>
        </Link>
      </li>
    );
  }
}

CardAlbums.propTypes = {
  album: PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};
