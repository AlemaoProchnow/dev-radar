/**
 * Na pasta "models" estão os modelos de como cada entidade vai ser no bando de 
 * dados, e Dev, nesse caso, é a principal entidade que vai ser usada, e aqui vai 
 * ser descrito como ela vai ser caracterizada.
 * 
 * A configuração de latitude e longitude é mais complexa que as outras, além 
 * de ocupar mais espaço, por isso essa configuração ficará em um arquivo 
 * separado (./utils/PointSchema).
 * 
 * Tudo isso pois não há uma configuração ou tipo em si já pré-definida para 
 * esse tipo de localização.
 * 
 * No mongoose.Schema vai ser declarado todos os campos que a tabela Dev vai ter.
 * Como no arquivo MySQL, em que indica a coluna e seu tipo de dado.
 */

const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  // [String] indica que a forma dos dados será uma array de strings
  techs: [String],
  location: {
    type: PointSchema,
    // "index" geralmente é usado para facilitar na busca, já que define seu tipo.
    index: '2dsphere'
  },
});

module.exports = mongoose.model('Dev', DevSchema);