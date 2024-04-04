const express = require('express');
const rssController=require('../../../controllers/frontend/rss.controller')
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(rssController.getAll));
// console.log('checkhome');
router.get('/rss/:link', catchAsync(rssController.parserss));
module.exports = router;