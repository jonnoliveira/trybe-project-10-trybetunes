import React, { Component } from 'react';
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
        <div data-testid="header-user-name">
          {
            isLoading === true
              ? <Loading />
              : userName
          }
        </div>
      </header>
    );
  }
}
