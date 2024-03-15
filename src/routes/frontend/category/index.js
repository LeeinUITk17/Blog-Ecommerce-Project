const express = require('express');
const categoryController = require('../../../controllers/frontend/category.controller');
const router = express.Router();
router.get('/:slug',categoryController.getAll);
module.exports = router;