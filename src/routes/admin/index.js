const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/admin');
<<<<<<< HEAD

=======
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
router.use((req,res,next)=>{
    req.app.set('layout','admin');
    middleware(req,res,next);
})
<<<<<<< HEAD

=======
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
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