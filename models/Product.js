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
  image : {
    type : String,
  },
  category_id : {
    type : String,
  },
  Orders : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Order',
    }
  ],
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;