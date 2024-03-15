const mongoose = require("mongoose");
const slugify=require("slugify");
const productModel = require("../model/product.model");
const addItem = async (body) => {
  body.slug=slugify(body.description, { lower: true });
  await productModel.create(body);
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
  return await productModel.find(query);
};

const getItemById = async (id) => {
  return await productModel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await productModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  if (body.name) {
    body.slug = slugify(body.description, { lower: true });
  }
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
};
