const express = require("express");
const router = express.Router();
const couponController = require("../../../controllers/admin/coupon.controller");
const {catchAsync}=require('../../../apps/utils/catchAsync');
router.use(express.json());

router.get("/form", catchAsync(couponController.getForm));
router.post(
  "/form",
 
 catchAsync( couponController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(couponController.getForm));
router.get("/delete/:id", catchAsync(couponController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(couponController.updateStatus));

router.get("(/:status)?", catchAsync(couponController.getAll));  

router.get('(/:status)?',catchAsync(couponController.statusCount));

router.post("/changeStatusTool",catchAsync( couponController.statusTool));
module.exports = router;
