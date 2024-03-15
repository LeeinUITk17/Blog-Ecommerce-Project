const categoryModel = require('../model/category.model');
const settingModel = require('../model/setting.model');
const newsModel = require('../model/news.model');
const rssModel=require('../model/rss.model');
class FrontendService {
  async getAllCategory() {
    return await categoryModel.find({ status: 'active' });
  }

  async getAllSetting() {
    return await settingModel.find();
  }

  async getAllNews() {
    return await newsModel.find({ status: 'active' }).sort({ ordering: 1 });
}

  async getAllRss(){
    return await rssModel.find({status:'active'});
  }
}

module.exports = new FrontendService();
