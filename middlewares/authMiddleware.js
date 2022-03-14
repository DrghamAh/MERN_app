const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.token, "usersecretkey");
    if (user) {
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
    const data = jwt.decode(req.headers.token)
    if (data.role === 2) {
      next();
    } else {
      res.status(403).json({error : {
        name : 'PermissionError',
        message : 'You have to be admin to get this route'
      }});
    }
  } catch (error) {
    res.status(501).json(error);
  }
}

module.exports = { isAuthenticated, isAdmin };