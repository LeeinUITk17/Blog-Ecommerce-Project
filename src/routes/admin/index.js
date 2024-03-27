const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/admin');
const role = require('../../middleware/role');
const { verifyToken } = require('../../helper/jwt.helper');
const devKey=require('../../helper/devkey');
router.use((req,res,next)=>{
    req.app.set('layout','admin');
    middleware(req,res,next);
})
router.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = verifyToken(token, devKey);
        if (decoded) {
            req.user = decoded;
        }
    }
    next();
});
router.use('/login' , require('./login'));
router.use(role);
router.use('/' , require('./dashboard'));
router.use('/news' , require('./news'));
router.use('/category',require('./category'));
router.use('/setting',require('./setting'));
router.use('/rss',require('./rss'));
router.use('/product',require('./product'));
router.use('/product/category',require('./product.category'));
router.use('/contact',require('./contact'));
router.use('/address',require('./address'));
router.use('/coupon',require('./coupon'));
router.use('/bill',require('./bill'));
router.use('/user',require('./user'));
module.exports = router;