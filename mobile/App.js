/**
 * No React Native, não há tags com mais relevâncias que outras (como H1 e P), 
 * no HTML e também não existe formatação padrão, ou seja, um texto é simplesmente 
 * um texto, independente se for título ou qualquer outra coisa e também, tudo 
 * necessita de personalização por meio do "CSS".
 * 
 * Não há o uso de " - " no "CSS", ele é sempre substituído por letra maiúscula, 
 * ou seja, o "background-color" por exemplo, será, aqui, "backgroundColor".
 * 
 * E os textos de personalização como "bold", "center" etc. deverão ser como uma 
 * string, ou seja, necessitam de aspas simples ou duplas.
 * 
 * Cada elemento necessita de sua própria estilização. Não há a heranca de certas 
 * características, como por exemplo no CSS padrão, em que, se colocar negrito 
 * em uma div, o texto dentro vai ser personalizado. Aqui, cada elemento precisa 
 * de sua própria personalização.
 * 
 * Na pasta "assets", "icon" é o ícone do aplicativo, ou seja, aquele que vai 
 * aparecer no menu do dispositivo, para o usuário clicar. E splash é a imagem 
 * de carregamento que vai aparecer logo em seguida que entrar no app (é aquela 
 * tela primária de carregamento).
 * 
 * Já que todas as statusbar do app vão ter os itens lá de cima modificados, a 
 * modificação já será feita no próprio App, para assim modificar tudo. Mas se 
 * a necessidade for apenas uma tela ou outra, basta ir na tela desejada e mexer 
 * nesta statusbar, referência, neste caso, na página desejada.
 */

import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#7D40E7"
      />
      <Routes />
    </>
  );
};
