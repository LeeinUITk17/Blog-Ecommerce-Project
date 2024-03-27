const express=require('express');
const router=express.Router();
const shopController = require('../../../controllers/product/shop.controller')
router.get('' , shopController.getAll);
module.exports = router;