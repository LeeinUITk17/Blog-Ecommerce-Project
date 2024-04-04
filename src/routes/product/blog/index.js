const express = require('express');
const blogController = require('../../../controllers/product/blog.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');

const router = express.Router();
router.get('/',catchAsync(blogController.getAll));
module.exports = router;