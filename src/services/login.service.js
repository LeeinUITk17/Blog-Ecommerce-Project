const bcrypt=require('bcrypt');
const mongoose = require("mongoose");
const usermodel=require('../model/user.model');
const register=async(body)=>{
 const user=new usermodel(body);
   const salt=await bcrypt.genSalt(10);
   user.password=await bcrypt.hash(user.password,salt);
   await user.save();
}
const login=async(body)=>{
    const {username,password}=body;
    const user=await usermodel.findOne({username});
    if(!user){ 
        throw new Error('Invalid username or password');
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Invalid username or password');
    }
    return user;
}
module.exports={
    register,
    login,
}