const express=require('express');
const router=express.Router();
const detailController = require('../../../controllers/product/detail.controller')
router.get('' , detailController.getAll);
module.exports = router;