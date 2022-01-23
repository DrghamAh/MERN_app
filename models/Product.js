const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name : {
    type : String,
  },
  price : {
    type : Number,
  },
  quantity : {
    type : Number,
  },
  category_id : {
    type : String,
  }

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;