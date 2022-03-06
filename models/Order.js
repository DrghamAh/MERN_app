const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const orderSchema = mongoose.Schema({
  user_id : {
    type : String,
    required : true,
  },
  status : {
    type : String,
    default : "pending",
  },
  payment : {
    type : String,
    default : 'due',
  }
}, {timestaps : true})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;