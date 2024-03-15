const express = require('express');
const viewproductController = require('../../../controllers/product/viewproduct.controller');
const router = express.Router();
router.get('/:id',viewproductController.getForm);
module.exports = router;