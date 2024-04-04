const express = require('express');
const loginController = require('../../../controllers/product/login.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(loginController.getAll));
router.get('/form',catchAsync(loginController.getForm));
router.post('/form', catchAsync(loginController.register));
router.post('/login', catchAsync(loginController.login));
router.get('/out', catchAsync(loginController.logout));
module.exports = router;
