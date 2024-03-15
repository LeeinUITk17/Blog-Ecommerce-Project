const express = require("express");
const router = express.Router();

const ItemController = require("../../controllers/item_controller");

router.get("", ItemController.getItems);
router.get("/:id", ItemController.getItemById);
router.post("/add", ItemController.addItem);
router.post("/update/:id", ItemController.updateItem);
router.delete("/delete/:id", ItemController.deleteItem);

module.exports = router;
