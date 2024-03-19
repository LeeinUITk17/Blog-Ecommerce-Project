const bcrypt = require('bcrypt');
const usermodel = require('../model/user.model');
const jwt = require('jsonwebtoken'); 
const session = require('express-session'); 
const express=require('express');
const app=express();  
app.use(session({
  secret: 'cnttvietnhatk17', 
  resave: false,
  saveUninitialized: true,
}));

const register = async (body) => {
  try {
      const user = new usermodel(body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
     return await user.save();
  } catch (error) {
      console.error(error);
      throw new Error('Registration failed');
  }
}


const login = async (req, body) => { 
  try {
    const { username, password } = body;
    const user = await usermodel.findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password');
    }
    req.session.userId = user._id;
    const auth = jwt.sign({ userId: user._id }, `${user._id}`);
    return auth;
  } catch (error) {
    console.error(error);
    throw new Error('Login failed');
  }
}

module.exports = {
  login,
  register,
}
