const express = require('express');
const router = express.Router();
const passwordValidator = require('../middleware/password');
const userCtrl = require('../controller/userC');
const auth = require('../middleware/auth')

router.get('/',auth , userCtrl.getAllUser)
router.get('/:id',auth , userCtrl.getOneUser)
router.post('/signup', passwordValidator, userCtrl.signup)
router.post('/login', userCtrl.login);
router.put('/:id',auth , userCtrl.updateOneUser)
router.delete('/:id',auth , userCtrl.deleteOneUser)

module.exports = router;