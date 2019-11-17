var mongoose = require ('mongoose');

const gamePlayer = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  buyIn: Number,
  cashOut: Number
});

const gameSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  closed: {
    type: Boolean,
    default: false
  },
  buyIn: Number,
  players: [gamePlayer]
});

module.exports = db.model('Game', gameSchema);