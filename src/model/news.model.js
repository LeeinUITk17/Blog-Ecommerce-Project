const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const COLLECTION_NAME = "News";

const Listimage=new Schema({
  Image:{
    type:String,
  }
})

const newSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    description: String,
    ordering: {
      type: Number,
      min: 1,
      default: 1,
    },
    avatar: {
      type: String,
    },
    content:{
      type: String,
    },
    slug:{
      type: String,
    },
    special: {
      type: Boolean, 
      default: false, 
    },
    category: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
  },
   List:{
    type: [Listimage],
    default:[],
   }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);