const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { OrderSchema, Product_OrderSchema } = require('../validation/OrderValidation');

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
 * @param {user_id, Products Array} req 
 * @param {*} res 
 */
module.exports.create = async (req, res) => {
  let products = [], errors = [];

  const {error, value} = OrderSchema.validate({
    user_id : req.body.user_id,
    data : req.body.data,
  });

  if (error) {
    res.status(400).json(error);
  }

  try {
    const response = await User.findById(req.body.user_id);
    if (response) {

    }
    res.status(400).json({error : 'User may not exist'});
  } catch (error) {
    
  }



  req.body.data.forEach(product => {
    const {error, value} = Product_OrderSchema.validate({
      product_id : product._id,
      quantity : product.quantity,
    }, {abortEarly : false});
    if (error) {
      errors.push(error);
    } else {
      products.push(value);
    }
  });

  if (errors[0]) {
    res.json({errors : errors});
  }
  
  try {
    products.forEach(async (product) => {
      const response = await Product.findById(product._id);
      if (response) {
        errors.push(`The Product with id of ${product._id} does not exist`);
      }
    });
    if (!errors[0]) {
      res.status(200).json({product : products});
    }
    res.status(400).json({errors : errors});
  } catch (error) {
    
  }
}



