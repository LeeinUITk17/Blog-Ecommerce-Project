const usermodel = require("../model/user.model");
const addItem = async (body) => {
  await usermodel.create(body);
};

const getItems = async (status, keyword) => {
  let query = {};
  if (status === 'all') {
    query = {};
  } else if (status) {
    query.status = status;
  }
  if (keyword) {
    query['userinformation.name'] = new RegExp(keyword, 'i');
  }
  return await usermodel.find(query);
};


const getItemById = async (id) => {
  return await usermodel.findById(id).exec();
};

const deleteItem = async (id) => {
  return await usermodel.deleteOne({ _id: id });
};

const updateItem = async (id, body) => {
  try {
    await usermodel.findByIdAndUpdate(id, { $set: { userinformation: body.userinformation, role: body.role } });
  } catch (error) {
    console.error(error);
    throw new Error('Update failed');
  }
};

const getStatusCounts = async () => {
  const items = await usermodel.find({});
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
