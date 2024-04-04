const express = require('express');
const router = express.Router();
const loginController = require('../../../controllers/admin/login.controller')
const {catchAsync}=require('../../../apps/utils/catchAsync');
router.get('/' , catchAsync(loginController.getform));
router.post('/' , catchAsync(loginController.login));
module.exports = router;