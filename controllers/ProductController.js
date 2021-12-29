const mysql = require('mysql');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const connect = mysql.createConnection({
  "database" : "mern_app",
  "user" : 'root',
  "host" : "localhost",
  "password" : '',
});

connect.connect();

exports.index = (req, res) => {
  connect.query("SELECT * FROM products", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result);
    }
  });
}

/**
 * @method POST
 * 
 * @param {Body} req 
 * @param {} res 
 */
exports.create = (req, res) => {
  const sql = "INSERT INTO products (name, price, quantity) VALUES (?);";
  const values = [
    req.body.name,
    req.body.price,
    req.body.quantity
  ];
  connect.query(sql, [values], (err, reslut) => {
    if (err) {
      res.send(err);
    } else {
      res.send(reslut);
    }
  })
  // send(req.body.name);
}

/**
 * @method GET
 * 
 * @param {id} req 
 * @param {BigInteger} res 
 */
exports.show = (req, res) => {
  const sql = "SELECT * FROM products WHERE id=?";
  const values = req.query.id;

  connect.query(sql, [values], (err, result) => {
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
 * @param {body, id} req
 * @param {} res
 */
exports.update = (req, res) => {
  const sql = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
  const values = [
    req.body.name,
    req.body.price,
    req.body.quantity,
    req.query.id,
  ];
  connect.query(sql, values, (err, result) => {
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
 * @param integer id
 */
exports.destroy = (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";
  const value = req.body.id;
  connect.query(sql, value, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}