const express = require('express');
const blogController = require('../../../controllers/product/blog.controller');
const router = express.Router();
router.get('/',blogController.getAll);
module.exports = router;