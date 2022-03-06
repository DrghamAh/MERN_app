const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const Order_ProductSchema = mongoose.Schema({
  order_id : {
    type : String,
    required : true,
  },
  product_id : {
    type : String,
    required : true,
  },
  quantity : {
    type : Number,
    default : 1,
  },
}, {timestamp : true});

const Order_Product = mongoose.model('Order_product', Order_ProductSchema);

module.exports = Order_Product;