const mongoose = require("mongoose");
const couponModel = require("../model/coupon.model");
const randomstring=require('randomstring');
const addItem = async (body) => {
  if(body.expirate< Date()){
    body.expirate= Date()+1;
  }
    body.code=randomstring.generate(10);
  await couponModel.create(body);
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
      { code: new RegExp(keyword, 'i') },
    ];
  }
  return await couponModel.find(query);
};

const getItemById = async (id) => {
  return await couponModel.findById(id).exec();
};
const getItemByCode = async (code) => {
  return await couponModel.findOne({
    code: code,
  });
};
const deleteItem = async (id) => {
  return await couponModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  await couponModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
};
const getStatusCounts = async () => {
  const items = await couponModel.find({});
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
  getItemByCode,
};
