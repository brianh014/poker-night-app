var mongoose = require ('mongoose');
var crypto = require("crypto");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  hash: String,
  salt: String
});

accountSchema.methods.setPassword = function(password) { 
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
};

accountSchema.methods.validPassword = function(password) { 
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
  return this.hash === hash;
}; 
   

module.exports = db.model('Account', accountSchema);