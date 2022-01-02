const { Double, Int32 } = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  key : {
    type : Number,
    required : true,
  },
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
    type : Number,
  }

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;