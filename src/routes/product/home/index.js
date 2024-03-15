const express = require('express');
const homepageController = require('../../../controllers/product/home.controller');
const router = express.Router();
router.get('/',homepageController.getAll);
module.exports = router;