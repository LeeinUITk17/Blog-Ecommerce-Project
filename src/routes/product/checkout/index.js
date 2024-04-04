const express = require('express');
const checkoutController = require('../../../controllers/product/checkout.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/',catchAsync(checkoutController.getAll));
router.post('/checkpoupon',catchAsync(checkoutController.checkpoupon));
module.exports = router;