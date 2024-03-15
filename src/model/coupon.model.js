const mongoose = require("mongoose");
const { Schema } = mongoose;

const COLLECTION_NAME = "coupon";

const newSchema = new Schema(
  {
    
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"]
    },
    expirate:{
        type:Date
        },
   
    createdAt: {
      type: Date,
      default: Date.now
    },
    ordering:{
        type:Number,
        default:0,
    },
    discount:{
        type:String,
        default:"percent",
        enum:["percent","money"]
    },
    value:{
        type:Number,
        default:0,
    },
    minimum:{
        type:Number,
        default:0,
    },
    code:{
        type:String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);
