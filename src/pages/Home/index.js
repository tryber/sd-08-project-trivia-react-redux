import React from 'react';
import { Container } from '@material-ui/core';
import FormLogin from '../../components/FormLogin';

class Home extends React.Component {
  render() {
    return (
      <Container maxWidth="md">
        <FormLogin />
      </Container>
    );
  }
}

export default Home;
