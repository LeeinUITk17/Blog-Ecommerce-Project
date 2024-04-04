const express = require('express');
const contactController = require('../../../controllers/frontend/contact.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');

const router = express.Router();
router.get('/', catchAsync(contactController.getAll));
router.post("/mail", catchAsync(contactController.sendContactMail));
module.exports = router;