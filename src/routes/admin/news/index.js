const express = require("express");
const router = express.Router();
const newController = require("../../../controllers/admin/news.controller");
const { handleValidate } = require("../../../validates/news.validate");
router.use(express.json());

router.get("/form", newController.getForm);
router.post(
  "/form",
  handleValidate(["name", "description", "status", "ordering"]),
  newController.addOrUpdateItem
);
router.get("/form/:id", newController.getForm);
router.get("/delete/:id", newController.deleteItem);
router.get('/changeStatus/:id/:status', newController.updateStatus);

router.get("(/:status)?", newController.getAll);  

router.get('(/:status)?',newController.statusCount);

router.post("/changeStatusTool", newController.statusTool);
router.post("/upload/:id", newController.imageUpload);
router.post("/dropzone/:id", newController.dropzoneUpload);
module.exports = router;
