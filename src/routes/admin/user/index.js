const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/admin/user.controller");

router.use(express.json());

router.get("/form", userController.getForm);
router.post(
  "/form",
  userController.addOrUpdateItem
);
router.get("/form/:id", userController.getForm);
router.get("/delete/:id", userController.deleteItem);
router.get('/changeStatus/:id/:status', userController.updateStatus);

router.get("(/:status)?", userController.getAll);  

router.get('(/:status)?',userController.statusCount);

router.post("/changeStatusTool", userController.statusTool);
module.exports = router;
