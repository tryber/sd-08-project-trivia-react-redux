import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class RedirectButton extends React.Component {
  render() {
    const { text, path, testId = '', callback = '' } = this.props;
    return (
      <Link to={ path }>
        <button type="button" data-testid={ testId } onClick={ callback }>
          {text}
        </button>
      </Link>
    );
  }
}

RedirectButton.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  testId: PropTypes.string,
  callback: PropTypes.func,
};

RedirectButton.defaultProps = {
  testId: '',
  callback: '',
};

export default RedirectButton;
