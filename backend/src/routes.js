// Importando o módulo de roteamento do Express.
const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

// Agora, "routes" é como se fosse a constante "app", do arquivo index.
const routes = Router();

// index (mostra vários), show (mostra um), store (cria), update (atualiza), 
// destroy (deleta).

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);

routes.get('/search', SearchController.index);

module.exports = routes;