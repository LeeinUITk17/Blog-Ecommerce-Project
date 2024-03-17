const mongoose = require("mongoose");
const { Schema } = mongoose;

const COLLECTION_NAME = "bill";

const receiverSchema = new Schema({
  name: String,
  phone: String,
  address: String,
  mail: String,
  note: String,
  id_account: String
});

const productSchema = new Schema({
  id: String,
  quantity: Number,
  price: Number,
  name:String,
});

const newSchema = new Schema(
  {
    list: {
      type: [productSchema] ,
      default:[],
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"]
    },
    code: {
      type: String
    },
    total: {
      type: Number
    },
    receiver: {
      type: [receiverSchema] ,
      default:[],
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    coupon: {
      type: String,
      default:"none",
    },
    provinceid:{
      type:String,
       default:"none",
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);
