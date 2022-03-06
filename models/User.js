const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

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
  }
}, {timestaps : true});

// userSchema.pre("save", async (next) => {
//   if (!this.isModified('password')) {
//     next();
//   }

//   const salt = bycrypt.genSalt(10);
//   this.password = bycrypt.hash(this.password, salt);
// })

const User = mongoose.model('User', userSchema);

module.exports = User;