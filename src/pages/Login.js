import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login as loginAction, fetchApiToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameUser: '',
      emailUser: '',
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    const { login, fetchTokenAndQuestions, history } = this.props;
    login(this.state);
    fetchTokenAndQuestions()
      .then(() => { history.push('/game'); });
  }

  render() {
    const { nameUser, emailUser } = this.state;
    return (
      <div className="login d-flex justify-content-center h-100">
        <div className="list-group text-center w-50 mt-auto mb-auto">
          <h3 className="list-group-item list-group-item-info">
            Login
          </h3>
          <div className="d-flex flex-column list-group-item">
            <form className="d-flex flex-column">
              <label htmlFor="name-input" className="d-flex">
                <span className="input-group-text">
                  Nome do Jogador
                </span>
                <input
                  id="name-input"
                  value={ nameUser }
                  onChange={ (e) => this.setState({ nameUser: e.target.value }) }
                  data-testid="input-player-name"
                  className="form-control"
                />
              </label>
              <label htmlFor="email-input" className="d-flex">
                <span className="input-group-text">
                  Email do Gravatar
                </span>
                <input
                  id="email-input"
                  value={ emailUser }
                  onChange={ (e) => this.setState({ emailUser: e.target.value }) }
                  data-testid="input-gravatar-email"
                  className="form-control"
                />
              </label>
              <button
                type="button"
                data-testid="btn-play"
                disabled={
                  !(nameUser.length > 0 && /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/
                    .test(emailUser))
                }
                onClick={ this.startGame }
                className="btn btn-primary"
              >
                Jogar
              </button>
            </form>
          </div>
          <div className="list-group-item list-group-item-secondary">
            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
                className="btn btn-secondary"
              >
                Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  fetchTokenAndQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (dados) => dispatch(loginAction(dados)),
  fetchTokenAndQuestions: () => dispatch(fetchApiToken()),
});

// const mapStateToProps = (state) => ({
//   Token: state.play.token,
// })
export default connect(null, mapDispatchToProps)(Login);
