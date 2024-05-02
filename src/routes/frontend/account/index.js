const express = require('express');
const accountController = require('../../../controllers/frontend/account.controller');
const {catchAsync}=require('../../../apps/utils/catchAsync');
const router = express.Router();

router.get('/', catchAsync(accountController.getInformation));
router.get('/upload', catchAsync(accountController.Uploadform));
router.get('/manage', catchAsync(accountController.Manageform));

module.exports = router;