const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(url, { useNewUrlParser : true });
client.connect();

const db = client.db('crud_app');
const collection = db.collection('categories');

/**
 * @method GET
 * 
 * @description Method to return all categories
 * 
 * @param req 
 * @param res
 */
exports.index = (req, res) => {
  collection.find().toArray((err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
}

/**
 * @method POST
 * 
 * @description method to add new category
 * @param req
 * @param res
 */
exports.create = (req, res) => {
  collection.insertOne({
    id : req.body.id,
    name : req.body.name,
  }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}

/**
 * @method GET
 * @description method to get a single category
 * 
 * @param {id} req
 * @param res
 */
exports.show = (req, res) => {
  collection.findOne({ id : req.query.id}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
}

/**
 * @method POST
 * @description method to update category
 * @param {id, body} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  collection.updateOne({id : req.query.id},{ $set : {
    id : req.query.id,
    name : req.body.name,
  }}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
}

/**
 * @method GET 
 * @description method to delete category
 * 
 * @param id 
 */
exports.destroy = (req, res) => {
  collection.deleteOne({ id : req.query.id }, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  })
}