const express = require('express');
const rssController=require('../../../controllers/frontend/rss.controller')
const router = express.Router();
router.get('/', rssController.getAll);
// console.log('checkhome');
router.get('/rss/:link', rssController.parserss);
module.exports = router;