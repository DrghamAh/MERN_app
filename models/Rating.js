const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const RatingSchema = mongoose.Schema({
  user_id : {
    type : String,
    required : true,
  },
  product_id : {
    type : String,
    required : true,
  },
  rate : {
    type : Number,
    required : true,
    default : 0.0,
  },
  message : {
    type : String,
    default : '',
  }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;