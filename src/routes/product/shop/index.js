const express = require('express');
const shopController = require('../../../controllers/product/shop.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/',catchAsync(shopController.getAll));
router.get('/detail/:name',catchAsync(shopController.getDetail));
module.exports = router;