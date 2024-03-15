const mongoose = require("mongoose");
const slugify=require("slugify");
const newsModel = require("../model/news.model");
const path=require('path');
const mainName='news';
const linkprefix=`/admin/${mainName}/`;
const addItem = async (body) => {
  body.slug=slugify(body.description, { lower: true });
  await newsModel.create(body);
};
const getItems = async ( keyword) => {
  let query = {};
  console.log(keyword);
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
  if (body.name) {
    body.slug = slugify(body.description, { lower: true });
  }
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
