const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = new Date();

const tokenSchema = new Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: date.setDate(date.getDate() + 1)
  }
});

module.exports = mongoose.model('Token', tokenSchema);
