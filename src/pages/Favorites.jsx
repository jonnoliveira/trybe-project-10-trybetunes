import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardMusic from '../components/CardMusic';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading === true
            ? <Loading />
            : (
              <ul>
                { musicsList.map((music) => (
                  <CardMusic
                    key={ music.trackId }
                    music={ music }
                  />)) }
              </ul>
            )
        }
      </div>
    );
  }
}