const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Active'
  },
  phoneNumber: {
    type: String,
    required: true
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  confirmed: {
    type: Boolean,
    default: 'false'
  }
});

module.exports = mongoose.model('User', userSchema);
