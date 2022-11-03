import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    userName: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const userObject = await getUser();

    this.setState({
      userName: userObject.name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        Header
        {
          isLoading === true
            ? <Loading />
            : (
              <div data-testid="header-user-name">
                { userName }
                <nav>
                  <Link data-testid="link-to-search" to="/search">Search</Link>
                  <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
                  <Link data-testid="link-to-profile" to="/profile">Profile</Link>
                </nav>
              </div>)
        }
      </header>
    );
  }
}
