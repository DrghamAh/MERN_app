const express = require('express');
const {index, create, destroy, show, update} = require('../controllers/CategoryController');
const bodyParser = require('body-parser');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const multer = require('multer');
const randomstring = require('randomstring');

const router = express.Router();

const storage = multer.diskStorage({
  destination : (req, file, callback) => {
    callback(null, '../client/public/uploads/categories');
  },
  filename : (req, file, callback) => {
    const extention = file.mimetype.split(RegExp('/'))[1];
    const fileName = randomstring.generate(12) + '_' + Date.now() + '.' + extention;
    callback(null, fileName);
  }
})

const upload = multer({storage : storage});

router.get('/categories', index);
router.get('/categories/:id', show);
router.post('/categories', isAuthenticated, upload.single('image'), create);
router.delete('/categories/:id', destroy);
router.put('/categories/:id', update);

module.exports = router;