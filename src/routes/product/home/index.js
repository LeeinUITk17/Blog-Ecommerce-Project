const express=require('express');
const router=express.Router();
const homeController = require('../../../controllers/product/home.controller')
router.get('' , homeController.getAll);
module.exports = router;