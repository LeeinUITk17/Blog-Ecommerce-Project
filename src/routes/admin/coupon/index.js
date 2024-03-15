const express = require("express");
const router = express.Router();
const couponController = require("../../../controllers/admin/coupon.controller");

router.use(express.json());

router.get("/form", couponController.getForm);
router.post(
  "/form",
 
  couponController.addOrUpdateItem
);
router.get("/form/:id", couponController.getForm);
router.get("/delete/:id", couponController.deleteItem);
router.get('/changeStatus/:id/:status', couponController.updateStatus);

router.get("(/:status)?", couponController.getAll);  

router.get('(/:status)?',couponController.statusCount);

router.post("/changeStatusTool", couponController.statusTool);
module.exports = router;
