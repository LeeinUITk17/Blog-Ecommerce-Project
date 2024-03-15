const express = require("express");
const router = express.Router();
const billController = require("../../../controllers/admin/bill.controller");
router.use(express.json());

router.get("/form", billController.getForm);
router.get("/form/:id", billController.getForm);
router.get('/changeStatus/:id/:status', billController.updateStatus);

router.get("(/:status)?", billController.getAll);  

router.get('(/:status)?',billController.statusCount);

router.post("/changeStatusTool", billController.statusTool);
module.exports = router;
