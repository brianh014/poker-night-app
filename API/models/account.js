var mongoose = require ('mongoose');

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = db.model('Account', accountSchema);