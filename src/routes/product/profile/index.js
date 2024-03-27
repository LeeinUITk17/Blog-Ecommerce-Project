const express=require('express');
const router=express.Router();
const profileController = require('../../../controllers/product/profile.controller')
router.get('' , profileController.getAll);
module.exports = router;