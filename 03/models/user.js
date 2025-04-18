const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['Visiteur', 'Administrateur'], default: 'Visiteur' }
});

module.exports = mongoose.model('User', UserSchema);
