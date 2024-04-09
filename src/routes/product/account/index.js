const express = require('express');
const accountController = require('../../../controllers/product/account.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');

const router = express.Router();
router.get('/',catchAsync(accountController.getAll));
router.post('/',catchAsync(accountController.updateInformation));
router.get("/upload", catchAsync(accountController.saleUploadForm));
router.get("/upload/:id",catchAsync(accountController.saleUploadForm));
router.post('/upload', catchAsync(accountController.saleUpload));
router.get('/manager', catchAsync(accountController.saleManage));
router.post('/avatarUpload',catchAsync(accountController.imageUpload));
router.post('/avatarProduct/:id',catchAsync(accountController.productUpload));
module.exports = router;