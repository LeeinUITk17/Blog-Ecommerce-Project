const express=require('express');
const router=express.Router();
const rssController=require('../../../controllers/admin/rss.controller');

router.get('',rssController.getAll);
router.get("/form",rssController.getForm);
router.post(
    "/form/:id",rssController.addOrUpdateItem
);
router.get("/form/:id",rssController.getForm);
router.get("/delete/:id",rssController.deleteItem);

module.exports=router;