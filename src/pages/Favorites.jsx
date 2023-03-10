import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardMusic from '../components/CardMusic';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/Favorites.css';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      musicsList: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const musics = await getFavoriteSongs();
      this.setState({
        musicsList: musics,
        isLoading: false,
      });
    }); 
  }

  async componentDidUpdate() {
    const musics = await getFavoriteSongs();
    this.setState({
      musicsList: musics,
    });
  }

  render() {
    const { musicsList, isLoading } = this.state;

    return (
      <div data-testid="page-favorites" className='favorites-container'>
        <Header />
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
          localStorage.getItem('favorite_songs').length === 2
            ? (
                <div className='favorites-notFound-container'>
                  <img src="https://cdn-icons-png.flaticon.com/512/2621/2621165.png" alt="Not Favorites found icon" />
                  <p> Não encontramos nada aqui ...</p>
                </div>
              )
            : (
              (
                <ul className='favorites-list'>
                  { musicsList.map((music) => (
                    <CardMusic
                      key={ music.trackId }
                      music={ music }
                    />)) }
                </ul>
              )
            )
        }
      </div>
    );
  }
}
