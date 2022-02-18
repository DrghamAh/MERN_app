const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const OrderSchema = require('../validation/OrderValidation');

/**
 * method to get all orders
 * @method GET
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.index = async (req, res) => {
  try {
    const response = await Order.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json(error); 
  }
}

/**
 * Method to create new order
 * @method POST
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.create = async (req, res) => {
  const {error, value} = OrderSchema.validate({
    product_id : req.body.product_id,
    user_id : req.body.user_id,
    quantity : req.body.quantity,
    subtotal : req.body.subtotal
  })
  
  if (!error) {
    try {
      const resultOne = await Product.findById(value.product_id);
      const resultTwo = await User.findById(value.user_id);
      if (resultOne && resultTwo) {
        const response = await Order.create({
          product_id : value.product_id,
          user_id : value.user_id,
          quantity : value.quantity,
          subtotal : value.subtotal
        });
        res.status(201).json(response);
      } else {
        res.status(400).json({error : 'Product or user may not exist'});
      }
    } catch (error) {
      res.status(501).json(error);
    }

  } else {
    res.status(400).json(error.details);
  }
}

