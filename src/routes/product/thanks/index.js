const express = require('express');
const thanksController = require('../../../controllers/product/thanks.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/',catchAsync(thanksController.getAll));
router.post('/add',catchAsync(thanksController.add));
module.exports = router;