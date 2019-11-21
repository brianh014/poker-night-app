var express = require('express');
var router = express.Router();
var Player  = require('../models/player');
var Auth = require('../auth/auth');

router.get('/', async function(req, res, next) {
  res.json(await Player.find().sort({name: 'asc'}));
});

router.get('/stats', async function(req, res, next) {
  let sort = req.query['sort'] || 'name';
  let dir = req.query['dir'] == 'desc' ? '-' : '';
  let limit = req.query['limit'];
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
      },
      {
        '$addFields': {
          'profit': { '$subtract': [ '$cashedOut', '$boughtIn' ] }
        }
      }
    ]
  )
  .sort(dir + sort)
  .limit(+limit || 1000);
  res.json(stats);
});

router.post('/', async function(req, res, next) {
  try {
    new Auth().checkToken(req);
    let player = await Player.findOne({_id: req.body._id});
    if (player == null) {
      player = new Player();
    }
    player.name = req.body.name;
    res.json(await player.save());
  }
  catch (err) {
    res.status(err.status || 500);
    err.status = err.status || '500';
    res.render('error', { message: 'Could update or create player', error: err });
  }
});

module.exports = router;
