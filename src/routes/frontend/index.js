const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/frontend');
const { verifyToken } = require('../../helper/jwt.helper');
const devKey=require('../../helper/devkey');
router.use((req,res,next)=>{
    req.app.set('layout','frontend');
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
router.use((req,res,next)=>{
    const user=req.user;
            if(user){
                res.locals.user=user;
            }else{
                res.locals.user=null;
            }
            next();
});
router.use('/login',require('./login'));
router.use('/', require('./home'));
router.use('/home',require('./home'));
router.use('/news', require('./news'));
router.use('/contact', require('./contact'));
router.use('/about', require('./about'));
router.use('/category', require('./category'));
router.use('/rss',require('./rss'));
router.use('/account',require('./account'));

module.exports = router;
