const express=require('express');
const router=express.Router();

router.use((req,res,next)=>{
    req.app.set('layout','product');
    next();
})

router.use('/',require('./home'));
router.use('/home',require('./home'));
router.use('/about', require('./about'));
router.use('/contact', require('./contact'));
router.use('/blog', require('./blog'));
router.use('/checkout', require('./checkout'));
router.use('/detail', require('./detail'));
router.use('/login', require('./login'));
router.use('/profile', require('./profile'));
router.use('/shop', require('./shop'));
module.exports = router;