const mongoose = require("mongoose");
const slugify=require("slugify");
const productModel = require("../model/product.model");
const path=require('path');
const mainName='product';
const linkprefix=`/admin/${mainName}/`;
const addItem = async (body) => {
  const product=await productModel.create(body);
  return product._id;
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
  return await productModel.find(query);
};

const getItemById = async (id) => {
  return await productModel.findById(id).exec();
};

const getItemBySalerID=async(salerID)=>{
  return await productModel.find({salerID:salerID});
};
const deleteItem = async (id) => {
  return await productModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  await productModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
};
const getStatusCounts = async () => {
  const items = await productModel.find({});
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
  getItemBySalerID,
};
