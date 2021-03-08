import React from 'react';

import logo from '../assets/logo.png';

function Logo(props) {
  return (
    <img src={ logo } alt="logo" className="logo" { ...props } />
  );
}

export default React.memo(Logo);
