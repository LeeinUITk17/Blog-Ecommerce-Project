const express = require("express");
const router = express.Router();
const newController = require("../../../controllers/admin/category.controller");
const { handleValidate } = require("../../../validates/news.validate");
const {catchAsync}=require('../../../apps/utils/catchAsync');
router.use(express.json());
router.get("/form", catchAsync(newController.getForm));
router.post(
  "/form",
  handleValidate(["name", "description", "status","ordering"]),
 catchAsync( newController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(newController.getForm));
router.get("/delete/:id", catchAsync(newController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(newController.updateStatus));

router.get("(/:status)?", catchAsync(newController.getAll));  

router.get('(:/status)?',catchAsync(newController.statusCount));

router.post("/changeStatusTool", catchAsync(newController.statusTool));
router.post("/upload/:id", catchAsync(newController.imageUpload));
module.exports = router;
