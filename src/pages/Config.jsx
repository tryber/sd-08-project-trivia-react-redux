import React, { Component } from 'react';

export default class Config extends Component {
  render() {
    return (
      <>
        <title
          data-testid="settings-title"
        />
        <h1>Tela de configurações</h1>
        <span>
          (requisito bônus)
        </span>
      </>
    );
  }
}
