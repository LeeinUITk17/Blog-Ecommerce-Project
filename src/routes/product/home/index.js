const express = require('express');
const homepageController = require('../../../controllers/product/home.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/',catchAsync(homepageController.getAll));
module.exports = router;