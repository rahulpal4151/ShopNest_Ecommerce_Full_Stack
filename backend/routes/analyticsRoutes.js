const express = require('express');
const { getAdminStats } = require('../controllers/analyticsController');
const { protect, admin } = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/', protect, admin, getAdminStats);

module.exports = router;