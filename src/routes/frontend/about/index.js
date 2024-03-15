const express = require('express');
const aboutController = require('../../../controllers/frontend/about.controller');
const router = express.Router();
router.get('/', aboutController.getAll);
module.exports = router;