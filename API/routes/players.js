var express = require('express');
var router = express.Router();
var Player  = require('../models/player');
var Game = require('../models/game');

router.get('/', async function(req, res, next) {
  res.json(await Player.find().sort({name: 'asc'}));
});

router.get('/stats/:id', async function(req, res, next) {
  let games = await Game.find({'players.player': req.params['id']})
  res.json(games);
});

router.post('/', async function(req, res, next) {
  try {
    let player = await Player.findOne({_id: req.body._id});
    if (player == null) {
      player = new Player();
    }
    player.name = req.body.name;
    res.json(await player.save());
  }
  catch (err) {
    res.status(500);
    err.status = '500';
    res.render('error', { message: 'Could update or create player', error: err });
  }
});

module.exports = router;
