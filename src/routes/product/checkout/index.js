const express = require('express');
const checkoutController = require('../../../controllers/product/checkout.controller');
const router = express.Router();
router.get('/',checkoutController.getAll);
router.post('/checkpoupon',checkoutController.checkpoupon);
module.exports = router;