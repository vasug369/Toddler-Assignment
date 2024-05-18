const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

router.post('/create', auth, postController.createPost);
router.get('/feed', auth, postController.getFeed);
router.get('/:postId', auth, postController.getPostDetails);

module.exports = router;
