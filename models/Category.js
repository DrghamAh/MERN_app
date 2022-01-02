const { Double, Int32 } = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name : {
    type: String,
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;