const express = require('express');
const cartController = require('../../../controllers/product/cart.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/',catchAsync(cartController.getAll));
router.post('/add',catchAsync(cartController.addCart));
router.get('/remove/:id',catchAsync(cartController.deleteCart));
module.exports = router;