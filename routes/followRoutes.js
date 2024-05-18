const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const auth = require('../middlewares/auth');

router.post('/follow', auth, followController.follow);

module.exports = router;
