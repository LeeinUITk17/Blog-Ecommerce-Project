const mongoose = require("mongoose");
const slugify = require("slugify");
const rssModel = require("../model/rss.model"); // Rename the model to rssModel for consistency
const Parser = require('rss-parser');
//const feedUrl = "https://vnexpress.net/rss/tin-moi-nhat.rss";
const parser = new Parser();
const addItem = async (body) => {
  // Add validation for input data
  // For example, check if required fields are present before creating an item
  return await rssModel.create(body);
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
  return await rssModel.find(query);
};

const getItemById = async (id) => {
  return await rssModel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await rssModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  // Add validation for input data
  await rssModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
};

const getStatusCounts = async () => {
  const items = await rssModel.find({});
  const statusCounts = {
    All: items.length,
    Active: items.filter((item) => item.status === 'active').length,
    Inactive: items.filter((item) => item.status === 'inactive').length,
  };
  return statusCounts;
};
const parse = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    return feed.items; 
  } catch (error) {
    console.error('Error parsing RSS feed:', error.message);
    throw error; 
  }
};
module.exports = {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
  parse,
};
