const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const FavoriteSchema = mongoose.Schema({
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    require : true,
  },
  product_id : {
    type : mongoose.Schema.Types.ObjectId,
    require : true,
  }
});

module.exports.Favorite = mongoose.model('Favorite', FavoriteSchema);