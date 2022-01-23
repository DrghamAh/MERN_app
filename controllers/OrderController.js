const Order = require('../models/Order');
const OrderSchema = require('../validation/OrderValidation');

module.exports.index = (req, res) => {
  Order.find().then(response => {
    res.json(response);
  }).catch(err => {
    res.json(err);
  })
}

module.exports.create = (req, res) => {
  const {error, value} = OrderSchema.validate({
    product_id : req.body.product_id,
    user_id : req.body.user_id,
    price : req.body.price,
  })
  
  if (!error) {
    Order.create({
      product_id : value.product_id,
      user_id : value.user_id,
      quantity : value.quantity,
      price : value.price
    }).then(response => {
      res.json(response);
    }).catch(err => {
      res.json(err);
    })
  } else {
    res.json(error.details);
  }
}