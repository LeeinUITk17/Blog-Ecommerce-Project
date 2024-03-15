const express = require('express');
const serviceController = require('../../../controllers/product/service.controller');
const router = express.Router();
router.get('/',serviceController.getAll);
module.exports = router;