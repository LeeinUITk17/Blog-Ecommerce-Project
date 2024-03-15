const mongoose = require("mongoose");
const { Schema } = mongoose;

const COLLECTION_NAME = "srcRss";

const newSchema = new Schema(
  {
    topic: {
      type: String,
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    type: {
      type: String,
      default: "thanhnien",
      enum: ["thanhnien", "vnexpress"],
    },
    ordering: {
      type: Number,
      min: 1,
      default: 1,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for ordering.',
      },
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);
