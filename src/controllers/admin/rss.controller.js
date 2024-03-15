const multer = require('multer');
const path=require('path');
const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
} = require("../../services/rss.service");
const { imageHelper } = require("../../helper/news.helper");
const mainName = 'rss';
const linkprefix = `/admin/${mainName}/`;
var express = require("express");
var router = express.Router();
class rssController{
    getAll=async(req,res,next)=>{
        let data=await getItems();
        res.render('admin/rss',{data});
    }
    getForm=async(req,res,next)=>{
        let {id}=req.params;
        if(id==""){
            res.render("admin/rss/form");
        }else{
            let data=await getItemById(id);
            res.render("admin/rss/form",{data});
        }
    }
    addOrUpdateItem = async (req, res) => {
        console.log(req.body);
        const { id } = req.params;
        console.log(id);
        try {
          if (id) {
            console.log('Willing update data!')
            await updateItem(id, req.body);
            req.flash("success", "Update item thành công", false);
          } else {
            console.log('Willing create data!')
            await addItem(req.body);
            req.flash("success", "Add item thành công", false);
          }
          res.redirect(`${linkprefix}`);
        } catch (error) {
          console.error('Error processing form:', error);
          req.flash("danger", "An error occurred", false);
          res.redirect(`${linkprefix}`);
        }
      };
      deleteItem = async (req, res, next) => {
        let { id } = req.params;
        await deleteItem(id);
        req.flash("success", "Delete item thành công", false);
        res.redirect(`${linkprefix}`);
      };
    
}
module.exports=new rssController();