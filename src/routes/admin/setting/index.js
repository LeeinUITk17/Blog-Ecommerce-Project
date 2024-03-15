const express = require('express');
const router = express.Router();
const settingController = require('../../../controllers/admin/setting.controller')

router.get('' , settingController.getAll);
router.get("/form", settingController.getForm);
router.post(
    "/form/:id",settingController.addOrUpdateItem
)
router.get("/form/:id", settingController.getForm);
router.post('/upload/:id',settingController.imageUpload);
module.exports = router;