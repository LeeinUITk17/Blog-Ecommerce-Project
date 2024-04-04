const express = require('express');
const accountController = require('../../../controllers/product/account.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');

const router = express.Router();
router.get('/',catchAsync(accountController.getAll));
router.post('/',catchAsync(accountController.updateInformation));
module.exports = router;