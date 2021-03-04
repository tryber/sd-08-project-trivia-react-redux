import React from 'react';

export default (htmlFor, text, name, dataTestId, onChange) => (
  <label htmlFor={ htmlFor }>
    {text}
    <input
      name={ name }
      type="text"
      data-testid={ dataTestId }
      onChange={ onChange }
    />
  </label>
);
