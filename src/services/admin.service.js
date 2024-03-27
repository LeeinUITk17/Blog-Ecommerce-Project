
const contactModel=require('../model/contact.model');
const categoryModel=require('../model/category.model');
const categoryProductModel=require('../model/productCategory.model');
const settingModel = require('../model/setting.model');
const newsModel=require('../model/news.model');
const billmodel=require('../model/bill.model');
const userModel=require('../model/user.model');
class adminService {
 
  async getAllcontact(){
    return await contactModel.find({});
  }
   
  async getAllcategory(){
     return await categoryModel.find({special:false}).select('name');
  }

  async getAllcategoryProduct(){
    return await categoryProductModel.find({special:false}).select('name');
  }
  async getSetting(){
    return await settingModel.find({});
  }
  async getNews(){
    return await newsModel.find({status: 'active'}).select('_id');
  }
  async getBill(){
    return await billmodel.find({status: 'inactive'}).select('_id');
  }
  async getUser(){
    return await userModel.find({}).select('_id');
  }
}

module.exports = new adminService();