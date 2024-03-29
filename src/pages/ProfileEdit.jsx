import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import editIcon from '../helpers/edit.svg';
import '../css/ProfileEdit.css';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userName: '',
      userEmail: '',
      userUrl: '',
      userDescription: '',
      isDisabled: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const user = await getUser();

    this.setState({
      userName: user.name,
      userEmail: user.email,
      userUrl: user.image,
      userDescription: user.description,
      isLoading: false,
    });
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      this.btnValidation();
    });
  };

  btnValidation = () => {
    const {
      userName,
      userEmail,
      userUrl,
      userDescription } = this.state;

    const validName = userName.length === 0;
    const validUrl = userUrl.length === 0;
    const validDescription = userDescription.length === 0;
    const validEmail = !this.validEmail(userEmail);

    const isValid = (validName || validUrl || validDescription || validEmail);
    this.setState({ isDisabled: isValid });
  };

  sendUser = () => {
    this.setState({ isLoading: true }, async () => {
      const { userName, userUrl, userDescription, userEmail } = this.state;
      const { history } = this.props;
      const user = {
        name: userName,
        email: userEmail,
        image: userUrl,
        description: userDescription,
      };
      await updateUser(user);
      this.setState({ isLoading: false });
      history.push('/profile');
    });
  };

  validEmail(email) {
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
  }

  render() {
    const {
      isLoading,
      userName,
      userEmail,
      userUrl,
      userDescription,
      isDisabled,
    } = this.state;

    return (
      <div data-testid="page-profile-edit" className='profileEdit-container'>
        <Header />
        {
          isLoading === true
            ? 
              (
                <div className='loading'>
                  <Loading />
                </div>
              )
            : (
              <div className='profileEdit-items-container'>
                <form className='profileEdit-items'>
                  <label htmlFor="userName">
                    Nome
                    <input
                      type="text"
                      name="userName"
                      value={ userName }
                      onChange={ this.onChangeHandler }
                      data-testid="edit-input-name"
                      placeholder='Qual seu nome?'
                    />
                  </label>

                  <label htmlFor="userEmail">
                    Email
                    <input
                      type="email"
                      name="userEmail"
                      value={ userEmail }
                      onChange={ this.onChangeHandler }
                      data-testid="edit-input-email"
                      placeholder='Qual seu email?'

                    />
                  </label>

                  <label htmlFor="userDescription">
                    Descrição
                    <input
                      type="text"
                      name="userDescription"
                      value={ userDescription }
                      onChange={ this.onChangeHandler }
                      data-testid="edit-input-description"
                      placeholder='Me fale sobre você?'
                      maxLength={150}
                    />
                  </label>

                  <label htmlFor="userUrl">
                    Imagem
                    <input
                      type="text"
                      name="userUrl"
                      value={ userUrl }
                      onChange={ this.onChangeHandler }
                      data-testid="edit-input-image"
                      placeholder='Qual foto deseja colocar?'
                    />
                  </label>

                  <button
                    type="button"
                    disabled={ isDisabled }
                    onClick={ this.sendUser }
                    data-testid="edit-button-save"
                  >
                    Save
                  </button>
                </form>
                <img src={ editIcon } alt="Edit icon" />
              </div>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
