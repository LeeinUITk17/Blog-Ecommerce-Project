const express = require('express');
const productService = require('../../services/product.service');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.layout = 'product';
    next();
});

router.use(async(req,res,next)=>{
    res.locals.listproduct=await productService.getAllproduct();
    next();
})

router.use(async(req,res,next)=>{
    res.locals.listcategoryproduct=await productService.getAllcategoryProduct();
    next();
})

router.use(async(req,res,next)=>{
    res.locals.listsetting=await productService.getAllsetting();
    next();
})
router.use(async(req,res,next)=>{
    res.locals.listnews=await productService.getAllnews();
    next();
})
 router.use(async(req,res,next)=>{
    res.locals.listaddress=await productService.getAlladdress();
    next();
 })

 router.use(async(req,res,next)=>{
    res.locals.listcoupon=await productService.getAllcoupon();
    next();
 })

router.use('/',require('./home'));
router.use('/home',require('./home'));
router.use('/cart',require('./cart'));
router.use('/checkout',require('./checkout'));
router.use('/shop',require('./shop'));
router.use('/service',require('./service'));
router.use('/contact',require('./contact'));
router.use('/about',require('./about'));
router.use('/blog',require('./blog'));
router.use('/thanks',require('./thanks'));
router.use('/viewproduct',require('./viewproduct'));
router.use('/login',require('./login'));
module.exports=router;