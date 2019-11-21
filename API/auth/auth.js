require('dotenv').config();
var jwt = require('jsonwebtoken');

module.exports = function() {
    let publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
    let privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
    let signOptions = {
        issuer:  'poker-night',
        subject:  'poker-night',
        audience:  'poker-night',
        expiresIn:  "12h",
        algorithm:  "RS256"
    }
    let verifyOptions = {
        issuer:  'poker-night',
        subject:  'poker-night',
        audience:  'poker-night',
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    }
    
    this.getToken = function(accountId) {
        return jwt.sign({'accountId': accountId}, privateKey, signOptions);
    }

    this.tokenIsValid = function(token) {
        try {
            jwt.verify(token, publicKey, verifyOptions);
        }
        catch (err) {
            return false;
        }
        return true;
    }

    this.checkToken = function(req) {
        let valid = this.tokenIsValid(req.header('Authorization'));
        if (!valid) {
            let err = new Error('Invalid token');
            err.status = 401
            throw err;
        }
    }

    this.decodeToken = function(req) {
        return jwt.verify(req.header('Authorization'), publicKey, verifyOptions);
    }
  };
