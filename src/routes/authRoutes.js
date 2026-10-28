const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const { requireFields } = require('../middlewares/validate');

router.post('/register', requireFields('name', 'email', 'password'), register);
router.post('/login', requireFields('email', 'password'), login);

module.exports = router;
