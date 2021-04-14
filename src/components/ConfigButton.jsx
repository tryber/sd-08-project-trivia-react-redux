import React from 'react';
import { useHistory } from 'react-router-dom';

const ConfigButton = () => {
  const history = useHistory();
  const handleSubmit = () => history.push('/configscreen');
  return (
    <div>
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ handleSubmit }
      >
        Configurações
      </button>
    </div>
  );
};

export default ConfigButton;
