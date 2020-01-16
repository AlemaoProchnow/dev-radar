/**
 * Os três conceitos principais do React são:
 * 
 * -> Componente
 * -> Propriedade
 * -> Estado
 */

/**
 * COMPONENTE
 * 
 * Um componente nada mais é do que o exemplo do App(), abaixo. Ele pode conter 
 * um código HTML, CSS, JS etc. É algo que vai ser como um bloco da interface. 
 * 
 * -> Ou em uma definição mais pragmática:
 *  "Bloco isolado de HTML, CSS e JS, o qual não interfere no resto da aplicação."
 * 
 * => Quando usar?
 *  Componentes são usados quando há partes da interface que são repetíveis ou 
 *  então podem ser usadas novamente.
 * 
 *  Uma exportação padrão "export App" se dá em algo mais secundário, que possui 
 *  um papel mais generalista na página.
 *  Já a exportação "export default" se dá quando o conteúdo é algo principal à 
 *  página, algo que não é tão divisível quando os outros componentes.
 * 
 * => Regras:
 *  1. Cada componente tem seu nome iniciado por letra maiúscula, como se fosse 
 *  uma classe.
 *  2. Sua referenciação no código se dá como tag padrão HTML, possuindo </>.
 *  3. Cada arquivo deve conter, no máximo, apenas um componente.
 *  4. Quando há vários componentes seguidos, como uma cadeia de componentes, é 
 *  necessário colocá-los dentro de algo, pois de forma avulsa irá ocorrer erro.
 *  5. Quando há uma função que terá uso apenas em um componente, sua formação é 
 *  feita no próprio corpo do componente.
 */

/**
 * PROPRIEDADE
 * 
 * Propriedades são como os atributos do HTML.
 * 
 * -> Ou em uma definição mais pragmática:
 *  "Informações que um componente PAI passa para um componente FILHO."
 * 
 * => Como usar?
 *  Para usá-los, é necessário colocar um certa propriedade como parâmetro na 
 *  função. As funções de que estou falando são App(), Header() etc.
 */

/**
 * ESTADO
 * 
 * Informação mantida pelo próprio componente. (Lembrar: IMUTABILIDADE).
 */

// import React, { useState } from 'react';

// function App() {
//   /**
//    * No React, quando usa-se o estado, o valor retornado será ao todo, 2. Ou seja, 
//    * a variável que foi definida e uma função para criar uma nova variável que 
//    * substitua o conteúdo da variável existente antes da mudança de estado. Por 
//    * isso que nunca será possível pegar a variável em si e colocar, por exemplo, 
//    * "counter++", pois o que tem de ser feito, é a definição de um novo valor 
//    * para a nova variável que será criada, e não para a já existente.
//    */

//   // O valor de parâmetro em "useState()" é o valor inicial da variável criada.

//   const [ counter, setCounter ] = useState(0);

//   function incrementCounter() {
//     return setCounter( counter + 1 );
//   }

//   return (
//     <>
//       <h1>Contador: {counter}</h1>

//       <button onClick={incrementCounter}>Contador +</button>
//     </>
//   );
// }

/**
 * Porém, usar <div /> neste contexto, pode acabar dificultando a estilização do 
 * ecossistema, já que há mais um container, poir isso que, para resolver essa 
 * situação, há os "fragmentos", que nada mais são do que tags vazias, ou seja, 
 * o que antes era <div />, agora é simplesmente </>. Assim, quando for feita a 
 * renderização, a tag simplesmente vai ser ignorada, porém a organização será 
 * mantida.
 */

/**
 * Quando se trata de funções em componentes, seu posicionamento deve ser no 
 * corpo do componente que vai usá-la, não podendo ficar fora, tornando assim 
 * a sintaxe melhor.
 */

/**
 * O primeiro problema que temos é pegar a localização do usuário. Para isso, os 
 * navegadores nos oferecem uma função, porém, necessitamos que essa função 
 * execute toda vez que ocorrer alguma mudança ou então App for renderizado. E 
 * para tornar isso possível, usamos um recurso do React, chamado de useEffect.
 * 
 * -> useEffect:
 *  => Toda vez que uma informação for alterada ou então a renderização do 
 *  componente, o que está em seu escopo é executado.
 */

/**
 * useEffect( () => {}, [] );
 * 
 * -> No segundo parâmetro, em que há a array, passamos todas as depêndencias, 
 * ou seja, toda vez que, o que está como dependência, alterar seu valor, ou 
 * mudar de alguma forma, a função que está no primeiro parâmetro é executada. 
 * Caso a array esteja vazia, a função do primeiro parâmetro será executada uma 
 * única vez.
 */

import React, { useEffect, useState } from 'react';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [ devs, setDevs ] = useState([]);

  useEffect( () => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs( response.data );
    }

    loadDevs();
  }, [] );

  async function handleAddDev(data) {
    const response = await api.post( '/devs', data);
    
    /**
     * Com o comando abaixo é possível renderizar imediatamente, em tela, algum 
     * registro que acabara de ser feito. Pois assim, ele seja o estado de Devs, 
     * como todo o conteúdo que já havia nessa variável, com o conteúdo recente 
     * que acabou de ser incluído no conjunto.
     */

    /**
     * Isso foi necessário pois no React, não podemos simplesmente pegar um dado 
     * e incluir um valor aleatoriamente, como seria no caso de "devs.push()". É 
     * então necessário que o dado sempre seja criado do zero, por isso que foi 
     * pego todos os dados anteriores e assim os incluiu com os dados recentes.
     */

    setDevs( [ ...devs, response.data ] );
  }

  /**
   * Toda vez que for percorrer uma array para renderização na tela, como está 
   * a seguir, no "ul", é necessário então que, no primeiro item que do return 
   * que precede todo o item da renderização, tenha o "key={ item.IDdeAlgumUsuário }".
   */

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          { devs.map( dev => (
            <DevItem key={ dev._id } dev={ dev } />
          ) ) }
        </ul>
      </main>
    </div>
  );
}

export default App;
