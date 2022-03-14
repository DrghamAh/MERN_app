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
  var products = [], errors = [];

  var {error, value} = OrderSchema.validate({
    user_id : req.body.user_id,
    data : req.body.data,
  });

  if (!error) {

    try {
      const response = await User.findById(value.user_id);

      if (response) {
        for (var i = 0; i < value.data.length; i++) {
          var product = await Product.findById(value.data[i].product_id);

          if (product.quantity < value.data[i].quantity) {
            errors.push({
              product_id : value.data[i].product_id,
              message : "This quantity is not avilable",
            });
          } else {
            continue;
          }
        }

        if (errors.length === 0) {
          errors = [];
          for (var i = 0; i < value.data.length; i++) {
            var product = await Product.findById(value.data[i].product_id);
            product.quantity -= value.data[i].quantity;
            const result = await product.save();

            if (!result) {
              errors.push({
                product_id : value.data[i].product_id,
                message : "We Could not buy product",
              });
            }
          }

          if (errors.length === 0) {

            const response = await Order.create({
              user_id : value.user_id,
              products : value.data.map(product => ({
                id : product.product_id,
                quantity : product.quantity,
              })),
            });
    
            if (response) {
              res.status(201).json(response);
            } else {
              res.status(501).json({error : 'Something went wrong'});
            }
          } else {
            res.status(501).json(errors);
          }

        } else {
          res.status(400).json(errors);
        }

        
      } else {
        res.status(400).json({error : 'User may not exist'});
      }
    } catch (error) {
      res.status(501).json(error);
    }

  } else {
    res.status(400).json(error);
  }

}

/**
 * @description Method to get single order
 * @method GET
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.show = async (req, res) => {
  try {
    const response = await Order.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @description Method to delete Order
 * @method DELETE
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.destroy = async (req, res) => {
  try {
    const response = await Order.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).json({error : "Something went wrong"});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}

/**
 * @description Method to get order's Products
 * @method GET
 * 
 * @param {*} req 
 * @param {*} res 
 */
module.exports.products = async (req, res) => {
  var products = [];
  try {
    const order = await Order.findById(req.params.id);
    if (order.products.length > 0) {
      for (var i = 0; i < order.products.length; i++) {
        const product = await Product.findById(order.products[i]);
        products.push(product);
      }
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(501).json(error);
  }
}
