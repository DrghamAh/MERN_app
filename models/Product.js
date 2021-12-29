const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mern_app', 'root', '', {
  host : 'localhost',
  database : 'mysql',
});

const Product = sequelize.define('Product', {
  id : {
    type : DataTypes.UUID,
    defaultValue : DataTypes.UUIDV4
  },
  name : {
    type : DataTypes.STRING,
  },
  price : {
    type : DataTypes.DOUBLE,
  },
  quantity : {
    type : DataTypes.INTEGER
  }
})