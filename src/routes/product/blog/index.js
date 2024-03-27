const express=require('express');
const router=express.Router();
const blogController = require('../../../controllers/product/blog.controller')
router.get('' , blogController.getAll);
module.exports = router;