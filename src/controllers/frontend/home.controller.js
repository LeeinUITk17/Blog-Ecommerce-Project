const {
    addItem,
    getItems,
    deleteItem,
    getItemById,
    updateItem,
    getStatusCounts,
  } = require("../../services/frontendNews.service");
 var express = require("express");
// const fs = require("fs/promises");
// const { now } = require("mongoose");
// const nodemailer = require("nodemailer");
// var router = express.Router();
const {
    highlightKeyword
}=require("../../helper/highlightkeyword.helper");
class HomeController {
    getAll = async (req, res, next) => {
        // console.log('testhome');
        res.render('frontend/home');

    }
    searchtool = async (req, res, next) => {
        let data;
        let keyword = req.query.keywords;
    
        if (keyword) {
            data = await getItems(keyword);
            // Apply highlightKeyword to each item's name and description with yellow background
            data.forEach(item => {
                item.name = highlightKeyword(item.name, keyword, 'yellow');
                item.description = highlightKeyword(item.description, keyword, 'yellow');
            });
        }
    
        res.render("frontend/searchSide", { data, keyword });
    };
    
}

module.exports = new HomeController();