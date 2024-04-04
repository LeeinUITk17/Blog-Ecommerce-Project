const express = require('express');
const homeController = require('../../../controllers/frontend/home.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(homeController.getAll));
// console.log('checkhome');
router.get('/search', catchAsync(homeController.searchtool));

module.exports = router;