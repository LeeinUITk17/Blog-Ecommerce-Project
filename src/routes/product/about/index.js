const express = require('express');
const aboutController = require('../../../controllers/product/about.controller');
const router = express.Router();
router.get('/',aboutController.getAll);
module.exports = router;