const express = require('express');
const viewproductController = require('../../../controllers/product/viewproduct.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/:id',catchAsync(viewproductController.getForm));
module.exports = router;