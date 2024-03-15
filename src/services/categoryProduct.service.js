const mongoose = require("mongoose");
const slugify = require("slugify");
const productCategoryModel = require("../model/productCategory.model");
const path=require('path');
const mainName='product/category';
const linkprefix=`/admin/${mainName}/`;
const addItem = async (body) => {
  body.slug=slugify(body.name, { lower: true });
   await productCategoryModel.create(body);
};
const getItems = async (status, keyword) => {
  let query = {};
  if (status === 'all') {
    query = {};
  } else if (status) {
    query.status = status;
  }
  if (keyword) {
    query.$or = [
      { name: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') }
    ];
  }
  return await productCategoryModel.find(query);
};

const getItemById = async (id) => {
  return await productCategoryModel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await productCategoryModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  if (body.name) {
    body.slug = slugify(body.name, { lower: true });
  }
  await productCategoryModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
};
const getStatusCounts = async () => {
  const items = await productCategoryModel.find({});
  const statusCounts = {
    All: items.length,
    Active: items.filter((item) => item.status === 'active').length,
    Inactive: items.filter((item) => item.status === 'inactive').length,
  };
  return statusCounts;
};
module.exports = {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
};
