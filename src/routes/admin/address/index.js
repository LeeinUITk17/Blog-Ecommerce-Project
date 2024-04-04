const express = require("express");
const router = express.Router();
const addressController = require("../../../controllers/admin/address.controller");
const {catchAsync}=require('../../../apps/utils/catchAsync');
router.use(express.json());

router.get("/form", catchAsync(addressController.getForm));
router.post(
  "/form",
 
  catchAsync(addressController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(addressController.getForm));
router.get("/delete/:id", catchAsync(addressController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(addressController.updateStatus));

router.get("(/:status)?", catchAsync(addressController.getAll));  

router.get('(/:status)?',catchAsync(addressController.statusCount));

router.post("/changeStatusTool", catchAsync(addressController.statusTool));
module.exports = router;
