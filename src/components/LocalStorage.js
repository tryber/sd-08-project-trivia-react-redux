import React from 'react';
import { connect } from 'react-redux';

class LocalStorage extends React.Component {
  constructor(props) {
    super(props);

    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  saveLocalStorage() {
    const { jogoState: { tokenReducer: { token } } } = this.props;
    if (token) {
      localStorage.setItem('token', JSON.stringify(token.token));
    }
  }

  render() {
    return (
      <div>
        {this.saveLocalStorage()}
        <p />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  jogoState: state
  ,
});

export default connect(mapStateToProps, null)(LocalStorage);
