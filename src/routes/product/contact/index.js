const express=require('express');
const router=express.Router();
const contactController = require('../../../controllers/product/contact.controller')
router.get('' , contactController.getAll);
module.exports = router;