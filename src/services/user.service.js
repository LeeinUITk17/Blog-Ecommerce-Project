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
  await usermodel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body }
  );
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
const updateInformation=async (id, data) => {
  const user = await usermodel.findById(id).exec();
  //console.log(user);
  if (!user) {
      throw new Error('User not found');
  }
 // console.log(data);
 // return;
 //console.log(data.userinformation.email);
  user.userinformation.forEach((info) => {
      if (data.userinformation.name) info.name = data.userinformation.name;
      if (data.userinformation.phone) info.phone = data.userinformation.phone;
      if (data.userinformation.address) info.address = data.userinformation.address;
      if (data.userinformation.email) info.email = data.userinformation.email;
  });
  await user.save();
   console.log('update success');
};

module.exports = {
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
  addItem,
  updateInformation,
};
