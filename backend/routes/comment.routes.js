
const express = require('express');
const router = express.Router();
const commentCtrl = require('../controller/commentC')
const auth = require('../middleware/auth')

router.get('/',auth , commentCtrl.getAllComment)
router.get('/:id',auth , commentCtrl.getOneComment)
router.post('/',auth , commentCtrl.createOneComment)
router.put('/:id',auth , commentCtrl.updateOneComment)
router.delete('/:id',auth , commentCtrl.deleteOneComment)


module.exports = router;
