const auth = require('../middleware/auth')
const express = require('express');
const router = express.Router();
const molter = require('../middleware/molter-config')
const postsCtrl = require('../controller/postsC');

router.get('/',/*auth ,*/ postsCtrl.getAllPosts)
router.get('/:id',auth , postsCtrl.getOnePosts)
router.post('/',auth , molter, postsCtrl.createOnePosts)
router.put('/:id',auth ,molter, postsCtrl.updateOnePosts)
router.delete('/:id',auth , postsCtrl.deleteOnePosts)

module.exports = router;