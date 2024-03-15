const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const COLLECTION_NAME = "mailbox";

const newSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    Email: String,
    Message:{
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
  },
  place:{
    type:String,
    default: "news",
    enum: ["news", "shop"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
},
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);