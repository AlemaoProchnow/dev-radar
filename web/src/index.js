/**
 * Em todo arquivo em que for usado o HTML dentro de um código JS, é necessária 
 * a importação do React.
 * 
 * 
 * No "render()", o que está sendo declarado é mair ou menos:
 * 
 * "Todo o conteúdo dentro do escopo App do arquivo App.js, vai ser renderizado 
 * dentro do box com id="root"."
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
