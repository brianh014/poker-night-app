var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var Auth = require('../auth/auth');

router.post('/create', async function(req, res, next) {
    try {
        if (req.body.password && req.body.password.length > 6
            && req.body.username && req.body.username.length > 4) {
            let account = new Account();
            account.username = req.body.username;
            account.setPassword(req.body.password);
            await account.save();
            res.json(true);
        }
        let err = new Error();
        err.status = 400;
        throw err;
    }
    catch (err) {
        res.status(err.status || 500);
        err.status = err.status || '500';
        res.render('error', { message: 'Could not create account', error: err });
    }
});

router.get('/login', async function(req, res, next) {
    try {
        let account = await Account.findOne({username: req.query['username']});
        if (!account.validPassword(req.query['password'])) {
            res.status(401);
            err = new Error();
            err.status = '401';
            res.render('error', { message: 'Incorrect password', error: err });
        }
        else {
            let auth = new Auth();
            let token = auth.getToken(account._id);
            res.json({token, username: account.username, isAdmin: account.isAdmin});
        }
    }
    catch (err) {
        res.status(500);
        err.status = '500';
        res.render('error', { message: 'Bad login', error: err });
    }
});

router.get('/context', async function(req, res, next) {
    try {
        let decodedToken = new Auth().decodeToken(req);
        let account = await Account.findOne({_id: decodedToken.accountId});
        account.passwordHash = null;
        res.json(account);
    }
    catch (err) {
        res.json(null);
    }
});

module.exports = router;
