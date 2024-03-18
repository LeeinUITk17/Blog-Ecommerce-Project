const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const userModel = require("../model/user.model");
const addItem = async (body) => {
  await userModel.create(body);
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
  return await userModel.find(query);
};

const getItemById = async (id) => {
  return await userModel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateItem = async (id, body) => {
  try {
    const { username, password } = body;
    const user = await usermodel.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }
    await userModel.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: body }
      );
  } catch (error) {
    console.error(error);
    throw new Error('update failed');
  }
};
const getStatusCounts = async () => {
  const items = await userModel.find({});
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
