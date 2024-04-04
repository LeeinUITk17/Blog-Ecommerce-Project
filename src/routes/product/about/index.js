const express = require('express');
const aboutController = require('../../../controllers/product/about.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');

const router = express.Router();
router.get('/',catchAsync(aboutController.getAll));
module.exports = router;