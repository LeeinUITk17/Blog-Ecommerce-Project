const mongoose = require("mongoose");
const newsModel = require("../model/setting.model");
const path=require('path');
const mainName='setting';
const linkprefix=`/admin/${mainName}/`;
const addItem = async (body) => {
   await newsModel.create(body);
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
  return await newsModel.find(query);
};

const getItemById = async (id) => {
  return await newsModel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await newsModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  await newsModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
};
const getStatusCounts = async () => {
  const items = await newsModel.find({});
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
