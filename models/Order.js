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
  },
  date : {
    type : Date,
    default : Date.now(),
  },
  products : [
    {
      _id : {
        type : mongoose.Schema.Types.ObjectId,
      },
      id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
      },
      quantity : {
        type : Number,
        default : 1
      },
    }
  ],
}, {timestaps : true})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;