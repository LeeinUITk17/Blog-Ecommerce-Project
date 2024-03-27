<<<<<<< HEAD
const express=require('express');
const router=express.Router();

router.use((req,res,next)=>{
    req.app.set('layout','product');
=======
const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/product');
const { verifyToken } = require('../../helper/jwt.helper');
const devKey=require('../../helper/devkey');
const { stringify } = require('uuid');
router.use((req, res, next) => {
    req.app.set('layout', 'product');
    if (req.baseUrl !== '/login') 
    { 
        middleware(req, res, next);
    } else {
        next();
    }
});

router.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = verifyToken(token, devKey);
        if (decoded) {
            req.user = decoded;
        }
    }
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
    next();
});
router.use((req,res,next)=>{
    const user=req.user;
            if(user){
                res.locals.user=user;
            }else{
                res.locals.user=null;
            }
            next();
})

router.use('/',require('./home'));
<<<<<<< HEAD
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
=======
router.use('/home', require('./home'));
router.use('/cart', require('./cart'));
router.use('/checkout', require('./checkout'));
router.use('/shop', require('./shop'));
router.use('/service', require('./service'));
router.use('/contact', require('./contact'));
router.use('/about', require('./about'));
router.use('/blog', require('./blog'));
router.use('/thanks', require('./thanks'));
router.use('/viewproduct', require('./viewproduct'));
router.use('/login', require('./login'));
router.use('/account',require('./account'));

module.exports = router;
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
