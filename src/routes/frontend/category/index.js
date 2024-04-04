const express = require('express');
const categoryController = require('../../../controllers/frontend/category.controller');
const {catchAsync}=require('../../../apps/utils/catchAsync');
const router = express.Router();

router.get('/:slug',catchAsync(categoryController.getAll));
module.exports = router;