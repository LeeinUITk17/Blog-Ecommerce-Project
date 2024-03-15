const multer = require('multer');
const path=require('path');
const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
  parse,
} = require("../../services/rss.service");
const { imageHelper } = require("../../helper/news.helper");
const mainName = 'rss';
const linkprefix = `/admin/${mainName}/`;
var express = require("express");
var router = express.Router();
class contactController {
    getAll = async (req, res, next) => {
        res.render('frontend/rss');
    }
    parserss=async(req,res,next)=>{
        let{link}=req.params;
        const data=parse(link);
        res.render('frontend/rss',{data});
      }
}

module.exports = new contactController();