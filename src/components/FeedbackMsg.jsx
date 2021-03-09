import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MSG extends React.Component {
  render() {
    const { acertos } = this.props;
    const numacertos = 3;
    const msg1 = 'Podia ser melhor...';
    const msg2 = 'Mandou bem!';
    if (acertos < numacertos) {
      return (
        <span data-testid="feedback-text">{ msg1 }</span>
      );
    } return (<span data-testid="feedback-text">{ msg2 }</span>);
  }
}
MSG.propTypes = {
  acertos: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({ acertos: state.player.assertions });
export default connect(mapStateToProps, null)(MSG);
