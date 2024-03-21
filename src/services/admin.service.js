
const contactModel=require('../model/contact.model');
const categoryModel=require('../model/category.model');
const categoryProductModel=require('../model/productCategory.model');
const settingModel = require('../model/setting.model');
class adminService {
 
  async getAllcontact(){
    return await contactModel.find({});
  }
   
  async getAllcategory(){
     return await categoryModel.find({special:false}).select('name slug');
  }

  async getAllcategoryProduct(){
    return await categoryProductModel.find({special:false}).select('name');
  }
  async getSetting(){
    return await settingModel.find({});
  }
}

module.exports = new adminService();
