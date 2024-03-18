const { Schema } = require("mongoose");
 mongoose = require("mongoose");

const COLLECTION_NAME = "user";

const information = new Schema({
    name:String,
    phone:String,
    address:String,
    email:String,
  });
const newSchema = new Schema(
  {
    username:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    userinformation:{
        type:[information],
        default:[],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(COLLECTION_NAME, newSchema);
