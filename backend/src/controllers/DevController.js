/**
 * Evitando duplicações no cadastro de usuários, isto é, se já haver algum 
 * usuário do GitHub com conta neste sistema, o cadastro não vai ser realizado 
 * novamente.
 * 
 * Já que o formato mandado pelo usuário é de uma simples string e o que está 
 * no banco é uma array, temos que realizar um pequeno processo antes, para 
 * consertar isso tudo:
 * 
 * A string será cortada, em cada momento que houver uma vírgula, e também, os 
 * espaços em branco serão retirados, após cada item da array formada for 
 * percorrida.
 * 
 * const techsArray = parseStringAsArray(techs);
 * 
 * 
 * Está a longitude antes pois é desse modo que o MongoDB grava geolocalização.
 * 
 * const location = { type: 'Point', coordinates: [longitude, latitude] };
 */

const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      // Se o nome não existir, o valor padrão vai ser o nome de login do GitHub.
      const { name = login, avatar_url, bio } = apiResponse.data;
      
      const techsArray = parseStringAsArray(techs);
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      // O parâmetro "message" pode ser a nomenclatura qualquer que desejar para a mensagem.
      sendMessage( sendSocketMessageTo, 'new-dev', dev );
    }
  
    return response.json(dev); 
  }
};