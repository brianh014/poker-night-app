var express = require('express');
var router = express.Router();
var Game = require('../models/game');
var Auth = require('../auth/auth');

router.get('/', async function(req, res, next) {
    res.json(await Game.find().populate('players.player').sort({date: 'desc'}));
});

router.get('/:id', async function(req, res, next) {
  res.json(await Game.findOne({_id: req.params['id']}).populate('players.player'));
});

router.post('/new', async function(req, res, next) {
    try {
      new Auth().checkToken(req);
      let game = new Game();
      game.date = req.body.date;
      game.buyIn = req.body.buyIn;
      await game.save();
      res.json(await Game.findOne({_id: game._id}).populate('players.player'));
    }
    catch (err) {
      res.status(err.status || 500);
      err.status = err.status || '500';
      res.render('error', { message: 'Could create new game', error: err });
    }
});

router.delete('/:id', async function(req, res, next) {
  try {
    new Auth().checkToken(req);
    let game = await Game.findOne({_id: req.params['id']});
    if (game.players.length > 0 || game.closed) {
      res.status(500);
      err.status = '500';
      res.render('error', { message: 'Could not delete game as it is closed or has players on it', error: err });
    }
    await Game.deleteOne({_id: game._id});
    res.json({'msg': 'Game deleted'});
  }
  catch (err) {
    res.status(err.status || 500);
    err.status = err.status || '500';
    res.render('error', { message: 'Could not add player', error: err });
  }
});

router.post('/:id/toggle-closed', async function(req, res, next) {
  try {
    new Auth().checkToken(req);
    let game = await Game.findOne({_id: req.params['id']});
    game.closed = !game.closed;
    await game.save();
    res.json(await Game.findOne({_id: game._id}).populate('players.player'));
  }
  catch (err) {
    res.status(err.status || 500);
    err.status = err.status || '500';
    res.render('error', { message: 'Could close or open game', error: err });
  }
});

router.post('/:id/add-player/:playerId', async function(req, res, next) {
  try {
    let game = await Game.findOne({_id: req.params['id']});
    this.mustBeOpen(game);
    game.players.push({
      player: req.params['playerId'],
      buyIn: game.buyIn,
      cashOut: null
    });
    await game.save();
    res.json(await Game.findOne({_id: game._id}).populate('players.player'));
  }
  catch (err) {
    res.status(500);
    err.status = '500';
    res.render('error', { message: 'Could not add player', error: err });
  }
});

router.post('/:id/update-player/:playerId', async function(req, res, next) {
  try {
    let game = await Game.findOne({_id: req.params['id']});
    this.mustBeOpen(game);
    let player = game.players.find(p => p._id == req.params['playerId']);
    player.buyIn = req.body.buyIn;
    player.cashOut = req.body.cashOut;
    await game.save();
    res.json(await Game.findOne({_id: game._id}).populate('players.player'));
  }
  catch (err) {
    res.status(500);
    err.status = '500';
    res.render('error', { message: 'Could not update player', error: err });
  }
});

router.delete('/:id/remove-player/:playerId', async function(req, res, next) {
  try {
    let game = await Game.findOne({_id: req.params['id']});
    this.mustBeOpen(game);
    game.players = game.players.filter(p => p._id != req.params['playerId']);
    await game.save();
    res.json(await Game.findOne({_id: game._id}).populate('players.player'));
  }
  catch (err) {
    res.status(500);
    err.status = '500';
    res.render('error', { message: 'Could not remove player', error: err });
  }
});

mustBeOpen = function(game) {
  if (game.closed) { 
    let err = new Error('Game is closed');
    err.status = 400
    throw err;
  }
}

module.exports = router;
