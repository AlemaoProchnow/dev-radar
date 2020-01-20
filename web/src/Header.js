/**
 * Já que na página principal, o <Header /> possui uma propriedade que é o title, 
 * temos que defini-la agora, como por exemplo:
 */

import React from 'react';

function Header(props) {
  return <h1> { props.title } </h1>
}

export default Header;