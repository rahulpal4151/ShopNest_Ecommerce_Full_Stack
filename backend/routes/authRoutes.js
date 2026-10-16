const express = require('express');
const { registerUser, loginUser, getUsers, verifyOTP, resendOTP } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.get('/users', protect, admin, getUsers);

module.exports = router;