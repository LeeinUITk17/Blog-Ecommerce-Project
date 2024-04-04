const express = require('express');
const router = express.Router();
const newsController = require('../../../controllers/frontend/news.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');

// router.get('/', newsController.getAll);
// console.log('checknews')
router.get("/:id",catchAsync(newsController.getForm));
module.exports = router;
            