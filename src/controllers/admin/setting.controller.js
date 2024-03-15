const multer = require('multer');
const path=require('path');
const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
} = require("../../services/setting.service");
const { imageHelper } = require("../../helper/news.helper");
const { body, validationResult } = require("express-validator");
const mainName = 'setting';
const linkprefix = `/admin/${mainName}/`;
var express = require("express");
var router = express.Router();
class DashboardController {
    getAll = async ( req , res , next) => {
      let data=await getItems();
        res.render('admin/setting',{data});
    }
    getForm = async (req, res, next) => {
        let { id } = req.params;
        if (id == "") {
          res.render("admin/setting/form");
        } else {
          let data = await getItemById(id);
          res.render("admin/setting/form", { data });
        }
    }
    addOrUpdateItem = async (req, res) => {
      console.log(req.body);
      const { id } = req.params;
      // console.log(id);
      try {
        if (id) {
          console.log('Willing update data!')
          await updateItem(id, req.body);
          req.flash("success", "Update item thành công", false);
        } else {
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
    imageUpload = async (req, res, next) => {
      const { id } = req.params;
    
      if (!id) {
        req.flash("danger", "Invalid operation", false);
        return res.redirect(`${linkprefix}`);
      }
    
      imageHelper(req, res, async (err) => {
        try {
          const filePath = path.join(req.file.filename);
          req.body.file = filePath;
    
          await updateItem(id, { avatar: filePath });
    
          req.flash("success", "Update image thành công", false);
          res.redirect(`${linkprefix}`);
        } catch (error) {
          console.error('Error processing form:', error);
          req.flash("danger", "An error occurred", false);
          res.redirect(`${linkprefix}`);
        }
      });
    };
}

module.exports = new DashboardController();

