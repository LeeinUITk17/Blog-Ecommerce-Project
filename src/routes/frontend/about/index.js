const express = require('express');
const aboutController = require('../../../controllers/frontend/about.controller');
const {catchAsync}=require('../../../apps/utils/catchAsync');
const router = express.Router();
router.get('/', catchAsync(aboutController.getAll));
module.exports = router;