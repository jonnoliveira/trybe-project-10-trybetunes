import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import './App.css';

class App extends React.Component {
  state = {
    inputNameValue: '',
    isDisable: true,
    isLoading: false,
    isClicked: false,
    login: false,
  };

  btnLoginValidation = () => {
    const { inputNameValue } = this.state;
    const maxCaract = 3;

    if (inputNameValue.length >= maxCaract) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  requestApi = async (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      isClicked: true,
    });

    const { inputNameValue } = this.state;
    const userName = await createUser({ name: inputNameValue });

    if (userName) {
      this.setState({
        isLoading: false,
        login: true,
      });
    }
  };

  onChangeHandler = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.btnLoginValidation();
    });
  };

  render() {
    const {
      inputNameValue,
      isDisable,
      isLoading,
      isClicked,
      login,
    } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/album/:id"
            render={ (props) => (
              <Album { ...props } />) }
          />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/search" component={ Search } />
          <Route
            exact
            path="/"
            >
              {
                login
                  ? <Redirect to="/search" />
                  : (
                      <Login
                        inputNameValue={ inputNameValue }
                        isDisable={ isDisable }
                        onChangeHandler={ this.onChangeHandler }
                        requestApi={ this.requestApi }
                        isLoading={ isLoading }
                        isClicked={ isClicked }
                      />
                    ) 
              }
          </Route>
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
