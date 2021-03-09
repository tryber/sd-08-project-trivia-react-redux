import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ButtonReturnToLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    const { testIdName } = this.props;
    return (
      !redirect
        ? (
          <button
            type="button"
            data-testid={ testIdName }
            onClick={ this.handleClick }
          >
            Jogar novamente
          </button>) : <Redirect to="/" />);
  }
}

ButtonReturnToLogin.propTypes = {
  testIdName: PropTypes.string.isRequired,
};
