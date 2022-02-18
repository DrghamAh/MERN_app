const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app');

const ImageSchema = mongoose.Schema({
  name : {
    type : String,
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;