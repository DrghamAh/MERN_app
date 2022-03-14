const { Favorite } = require('../models/Favorite');
const Product = require('../models/Product');
const FavoriteSchema = require('../validation/FavoriteValidation');

module.exports.products = async (req, res) => {
  try {
    const response = await Product.findById(req.params.id);

    res.status(200).json(response.favorites);
    
  } catch (error) {
    res.status(501).json(error);
  }
}

module.exports.create = async (req, res) => {
  const {error, value} = FavoriteSchema.validate({
    user_id : req.params.id,
    product_id : req.body.product_id,
  })

  if (!error) {
    try {
      const response = await Favorite.create({
        user_id : value.user_id,
        product_id : value.product_id,
      });
  
      if (response) {
        res.status(201).json(response);
      } else {
        res.status(400).json({error : 'Something went wrong'});
      }
    } catch (error) {
      res.status(501).json(error);
    }

  } else {
    res.status(400).json(error);
  }
  
}