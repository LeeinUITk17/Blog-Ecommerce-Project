const { Schema } = require("mongoose");
 mongoose = require("mongoose");

const COLLECTION_NAME = "setting";

const newSchema = new Schema(
  {
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    about: { type: String },
    avatar: {
        type: String,
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
