const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  product_id : {
    type : String,
    required : true,
  },
  user_id : {
    type : String,
    required : true,
  },
  quantity : {
    type : Number,
    required : true,
    default : 1,
  },
  create_at : Date,
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;