const express = require('express');
const serviceController = require('../../../controllers/product/service.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/',catchAsync(serviceController.getAll));
module.exports = router;