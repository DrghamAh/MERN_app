const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/crud_app")

const userSchema = mongoose.Schema({
  name : {
    type : String,
    require : true,
  },
  email : {
    type : String,
    require : true,
    unique : true,
  },
  password : {
    type : String,
    require : true,
    min : 8,
  },
  phone : {
    type : String,
    require : true,
  },
  role : {
    type : Number,
    default : 1,
  },
  favorites : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Product',
    }
  ],
}, {timestaps : true});


const User = mongoose.model('User', userSchema);

module.exports = User;