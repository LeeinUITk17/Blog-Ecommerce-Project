const express = require("express");
const router = express.Router();
const addressController = require("../../../controllers/admin/address.controller");

router.use(express.json());

router.get("/form", addressController.getForm);
router.post(
  "/form",
 
  addressController.addOrUpdateItem
);
router.get("/form/:id", addressController.getForm);
router.get("/delete/:id", addressController.deleteItem);
router.get('/changeStatus/:id/:status', addressController.updateStatus);

router.get("(/:status)?", addressController.getAll);  

router.get('(/:status)?',addressController.statusCount);

router.post("/changeStatusTool", addressController.statusTool);
module.exports = router;
