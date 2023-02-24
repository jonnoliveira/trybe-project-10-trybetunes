import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/CardAlbums.css';

export default class CardAlbums extends Component {
  render() {
    const { album } = this.props;
    const { collectionId, artworkUrl100, collectionName, trackCount } = album;
    return (
      <li className="cardAlbum-container">
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="cardAlbum-link-container"
        >
          <div className='image-title-cardAlbum'>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <h3>
              { `Álbum: ${collectionName}`}
            </h3>
          </div>
          <p>
            { `Músicas: ${trackCount}`}
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
