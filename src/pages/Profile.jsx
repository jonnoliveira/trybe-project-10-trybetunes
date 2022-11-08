import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userName: '',
      userEmail: '',
      userUrl: '',
      userDescription: '',
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

  render() {
    const { isLoading,
      userName,
      userEmail,
      userUrl,
      userDescription } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading === true
            ? <Loading />
            : (
              <section>
                <div>
                  <img src={ userUrl } alt={ userName } data-testid="profile-image" />
                  <h3>Nome</h3>
                  <p>{ userName }</p>
                  <h3>Email</h3>
                  <p>{ userEmail }</p>
                  <h3>Descrição</h3>
                  <p>{ userDescription }</p>
                </div>
                <button
                  type="button"
                  data-testid="link-to-profile-edit"
                >
                  <Link
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </button>
              </section>
            )
        }
      </div>
    );
  }
}
