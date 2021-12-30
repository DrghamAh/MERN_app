const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(url, { useNewUrlParser : true });
client.connect();
const db = client.db('crud_app');
const collection = db.collection('products');

exports.index = (req, res) => {
  collection.find().toArray((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

/**
 * @method POST
 * 
 * @param {Body} req 
 * @param {} res 
 */
exports.create = (req, res) => {
  collection.insertOne({
    name : req.body.name,
    price : req.body.price,
    quantity : req.body.quantity,
    category_id : req.body.category_id,
  }, (err, result) => {
    if (err) res.send(err);
    res.json(result);
  });
}

/**
 * @method GET
 * 
 * @param {id} req 
 * @param {BigInteger} res 
 */
exports.show = (req, res) => {
  collection.findOne({id : req.query.id}, (err, result) => {
    if (err) res.json(err);
    else res.json(result);
  })
}

/**
 * @method POST
 * 
 * @param {body, id} req
 * @param {} res
 */
exports.update = (req, res) => {
  collection.findOneAndUpdate({id : req.query.id}, { $set : {
    name : req.body.name,
    price : req.body.price,
    quantity : req.body.quantity,
    category_id : req.body.category_id,
  }}, (err, result) => {
    if (err) res.json(err);
    else res.json(result);
  });
}

/**
 * @method POST
 * 
 * @param integer id
 */
exports.destroy = (req, res) => {
  collection.findOneAndDelete({id : req.query.delete}, (err, result) => {
    if (err) res.json(err);
    else res.json(result);
  })
}