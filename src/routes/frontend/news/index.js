const express = require('express');
const router = express.Router();
const newsController = require('../../../controllers/frontend/news.controller');

// router.get('/', newsController.getAll);
// console.log('checknews')
router.get("/:id",newsController.getForm);
module.exports = router;
            