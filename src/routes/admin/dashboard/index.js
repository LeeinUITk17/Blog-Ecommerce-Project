const express = require('express');
const router = express.Router();
const {catchAsync}=require('../../../apps/utils/catchAsync');
const dashboardController = require('../../../controllers/admin/dashboard.controller')
router.get('' , catchAsync(dashboardController.getAll));
router.get('/changeStatus/:id/:status', catchAsync(dashboardController.updateStatus));
router.get('/delete/:id',catchAsync(dashboardController.deleteItem));
module.exports = router;