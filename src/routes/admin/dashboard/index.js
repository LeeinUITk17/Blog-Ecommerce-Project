const express = require('express');
const router = express.Router();
const dashboardController = require('../../../controllers/admin/dashboard.controller')
router.get('' , dashboardController.getAll);
router.get('/changeStatus/:id/:status', dashboardController.updateStatus);
router.get('/delete/:id',dashboardController.deleteItem);
module.exports = router;