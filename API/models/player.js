var mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String
});

module.exports = db.model('Player', playerSchema);