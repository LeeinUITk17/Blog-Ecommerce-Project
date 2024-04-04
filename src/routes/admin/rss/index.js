const express=require('express');
const router=express.Router();
const rssController=require('../../../controllers/admin/rss.controller');
const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('',catchAsync(rssController.getAll));
router.get("/form",catchAsync(rssController.getForm));
router.post(
    "/form/:id",catchAsync(rssController.addOrUpdateItem)
);
router.get("/form/:id",catchAsync(rssController.getForm));
router.get("/delete/:id",catchAsync(rssController.deleteItem));

module.exports=router;