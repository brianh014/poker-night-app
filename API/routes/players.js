var express = require('express');
var mongoose = require ('mongoose');
var router = express.Router();
var Player  = require('../models/player');
var Game = require('../models/game');

router.get('/', async function(req, res, next) {
  res.json(await Player.find().sort({name: 'asc'}));
});

router.get('/stats', async function(req, res, next) {
  let stats = await Player.aggregate(
    [
      {
        '$lookup': {
          'from': 'games',
          'let': { 'player_id': '$_id' },
          'pipeline': [
              {
                '$unwind': '$players'
              },
              { 
                '$match': {
                  '$expr': { '$eq': ['$$player_id', '$players.player'] }
                }
              }
          ],
          'as': 'games'
        }
      },
      {
        '$addFields': {
          'gamesPlayed': { '$size': '$games' }
        }
      },
      {
        '$unwind': {
          'path': '$games',
          'preserveNullAndEmptyArrays': true
        }
      },
      {
        '$unwind': {
          'path': '$games.players',
          'preserveNullAndEmptyArrays': true
        }
      },
      {
        '$group': {
          '_id': '$_id',
          'name' : {
            '$first': '$name'
          },
          'boughtIn': {
            '$sum': '$games.players.buyIn'
          }, 
          'cashedOut': {
            '$sum': '$games.players.cashOut'
          },
          'gamesPlayed': {
            '$first': '$gamesPlayed'
          },
          'avgProfit': {
            '$avg': { '$subtract': [ '$games.players.cashOut', '$games.players.buyIn' ] }
          }
        }
      }
    ]
  ).sort({name: 'asc'});
  res.json(stats);
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
