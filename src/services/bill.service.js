const mongoose = require("mongoose");
const slugify=require("slugify");
const billModel = require("../model/bill.model");
const randomstring=require('randomstring');
const addItem = async (body) => {
  body.code=randomstring.generate(10);
  await billModel.create(body);
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
  return await billModel.find(query);
};

const getItemById = async (id) => {
  return await billModel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await billModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  await billModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
};
const getStatusCounts = async () => {
  const items = await billModel.find({});
  const statusCounts = {
    All: items.length,
    Active: items.filter((item) => item.status === 'active').length,
    Inactive: items.filter((item) => item.status === 'inactive').length,
  };
  return statusCounts;
};
module.exports = {
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
  addItem,
};
