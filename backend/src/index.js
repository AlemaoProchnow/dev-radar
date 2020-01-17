// Importando o express para uso.
const express = require('express');
// Importando o CORS
const cors = require('cors');
// Importando o Mongoose.
const mongoose = require('mongoose');
// Importando as rotas.
const routes = require('./routes');
/**
 * Já que "routes" não é um pacote (Nesse caso), e sim apenas um outro arquivo, 
 * é necessário colocar a referenciação como um caminho de arquivo, e não como 
 * os outros exemplos, que são pacotes do node_modules.
 */

// Criando a aplicação do express.
const app = express();

mongoose.connect('mongodb+srv://<user>:<password>@cluster0-gkqu8.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
// (URL disponibilizada na aba de conexão ao cluster, no MongoDB).

/**
 * Por padrão, o express não entende JSON. Por isso é necessário já identificar, 
 * para todas as rotas ( app.use() ), que o conteúdo será em JSON.
 * 
 * Quando usa-se app.get() ou app.post() por exemplo, a configuração se refere 
 * apenas às requisições no esquema de GET ou POST. Já quando se usa use(), está 
 * configurando todo e qualquer tipo de requisição.
 */
app.use( express.json() );
/**
 * O comando de express.json() tem que vir antes do que os outros comandos de 
 * rota.
 */
// Com isso, todas as rotas podem ser usadas.
app.use(routes);

/**
 * Se o localhost:3333 é acessado, sem especificar alguma rota específica, como 
 * /users, /login por exemplo, a resposta padrão a ser recebida é do conteúdo 
 * abaixo, em que é especificado o caminho "/".
 */
/**
 * @param {
 *  "request" é tudo aquilo que o front-end está pedindo para o back-end. 
 *  Geralmente são alguns pedidos especificando o que é desejado para ser 
 *  exibido no front-end.
 * } request
 * @param {
 *  "response" é a resposta dessa requisição, que neste caso, define o modo que 
 *  a resposta será recebida pelo cliente.
 * } response
 */
// app.post('/users', (request, response) => {
//   /**
//    * Já que a forma de se comunicar é por JSON, geralmente se passa a resposta 
//    * do modo como está abaixo, quando se trata de textos.
//    */
//   return response.json({ message: 'Hello, OmniStack!' });
// });


// CORS permite que o Node funcione com vários acessos, e não apenas na porta 3333.
app.use( cors() );

// Defining the port of localhost where will work all the process.
// -> localhost:3333
app.listen(3333);

/**
 * Métodos HTTP: GET, POST, PUT, DELETE.
 * 
 * Tipos de parâmetros:
 *  Query Params: request.query (Filtros, ordenação, paginação etc.).
 *    -> Exemplo: /users (código), /users?search=Cristian (URL)
 *    -> Mais usado no GET.
 *  Route Params: request.params (Identificar um recurso na alteração ou remoção).
 *    -> Exemplo: /users/:id (código), /users/1 (URL (1 é ID do usuário no banco)).
 *    -> Mais usado no PUT e DELETE.
 *  Body: request.body (Dados para criação ou alteração de um registro).
 *    -> Exemplo: /users (código), /users (URL).
 *    -> Mais usado no PUT e POST.
 */
