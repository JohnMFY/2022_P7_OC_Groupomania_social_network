const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();

const postsCtrl = require('../controller/postsC');

router.get('/',auth , postsCtrl.getAllPosts)
router.get('/:id',auth , postsCtrl.getOnePosts)
router.post('/',auth , postsCtrl.createOnePosts)
router.put('/:id',auth , postsCtrl.updateOnePosts)
router.delete('/:id',auth , postsCtrl.deleteOnePosts)

module.exports = router;