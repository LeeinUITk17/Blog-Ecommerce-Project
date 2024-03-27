const express=require('express');
const router=express.Router();
const loginController = require('../../../controllers/product/login.controller')
router.get('' , loginController.getAll);
module.exports = router;