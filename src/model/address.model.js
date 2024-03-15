const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const COLLECTION_NAME = "deliveryAddress";

const newSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    ordering:{
        type:Number,
        default:0,
    },
    charging:{
        type:Number,
        default:0,
        },
     slug:{
        type:String,
     } ,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);