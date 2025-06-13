const express = require('express');
const router = express.Router();
const { register, login, getMe, changePassword } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.get('/me', auth, getMe);
router.post('/register', register);
router.post('/login', login);
router.put('/change-password', auth, changePassword);


module.exports = router;

