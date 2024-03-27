const express=require('express');
const router=express.Router();
const checkoutController = require('../../../controllers/product/checkout.controller')
router.get('' , checkoutController.getAll);
module.exports = router;