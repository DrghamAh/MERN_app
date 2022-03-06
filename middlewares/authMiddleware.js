const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const user = await jwt.verify(req.headers.token, "secretkey");
    const admin = await jwt.verify(req.headers.token, 'adminsecretkey');
    if (user || admin) {
      next()
    } else {
      res.status(403).json({error : 'you are not logged in'});
    }
  } catch (error) {
    res.status(501).json({error : error});
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const data = await jwt.verify(req.headers.token, 'adminsecretkey');
    if (data) {
      next();
    } else {
      res.status(403).json({error : 'You do not have permission to get this route'});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}

module.exports = { isAuthenticated, isAdmin };