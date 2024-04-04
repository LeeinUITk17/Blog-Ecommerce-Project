const express = require("express");
const router = express.Router();
const billController = require("../../../controllers/admin/bill.controller");
const {catchAsync}=require('../../../apps/utils/catchAsync');
router.use(express.json());

router.get("/form", catchAsync(billController.getForm));
router.get("/form/:id", catchAsync(billController.getForm));
router.get('/changeStatus/:id/:status', catchAsync(billController.updateStatus));

router.get("(/:status)?", catchAsync(billController.getAll));  

router.get('(/:status)?',catchAsync(billController.statusCount));

router.post("/changeStatusTool", catchAsync(billController.statusTool));
module.exports = router;
