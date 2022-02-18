const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const id = await jwt.verify(req.headers.token, "secretkey");
    if (id) {
      next()
    } else {
      res.status(403).json({error : 'you are not logged in'});
    }
  } catch (error) {
    res.status(501).json({error : error});
  }
}

module.exports = isAuthenticated;