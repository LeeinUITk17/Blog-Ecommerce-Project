const express=require('express');
const router=express.Router();
const aboutController = require('../../../controllers/product/about.controller')
router.get('' , aboutController.getAll);
module.exports = router;