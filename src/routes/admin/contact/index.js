const express = require('express');
const router = express.Router();
const contactController = require('../../../controllers/admin/contact.controller')
const { catchAsync}=require('../../../apps/utils/catchAsync');
router.get('/form/:id' , catchAsync(contactController.getForm));
router.get('', catchAsync(contactController.getAll));
module.exports = router;