import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import lupa from '../helpers/lupa.svg';
import favorite from '../helpers/favorite.svg';
import profile from '../helpers/profile.svg';
import '../css/Header.css';

export default class Header extends Component {
  state = {
    userName: '',
    userURL: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const userObject = await getUser();

    this.setState({
      userName: userObject.name,
      userURL: userObject.image,
      isLoading: false,
    });
  }

  render() {
    const { userName, userURL, isLoading } = this.state;

    return (
      <header data-testid="header-component" className='header-container'>
        {
          isLoading === true
            ? <Loading />
            : (
              <div data-testid="header-user-name" className='header-name'>
                <div className='header-user-image-container'>
                  <img src={ userURL } alt="User icon" />
                  <p>
                    { userName }
                  </p>
                </div>
                <nav className='header-nav'>
                  <ul className='header-list'>
                    <li>
                      <Link data-testid="link-to-search" to="/search" className='header-link'>
                        <img src={ lupa } alt="lupa icon" />
                        <p>Search</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        data-testid="link-to-favorites"
                        to="/favorites"
                        className='header-link'
                      >
                        <img src={ favorite } alt="favorite icon" />
                        <p>Favorites</p> 
                      </Link>
                    </li>
                    <li>
                      <Link data-testid="link-to-profile" to="/profile" className='header-link'>
                        <img src={ profile } alt="profile icon" />
                        <p>Profile</p>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>)
        }
      </header>
    );
  }
}
