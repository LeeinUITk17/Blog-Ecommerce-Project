const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/product');

router.use((req, res, next) => {
    req.app.set('layout', 'product');
    if (req.baseUrl !== '/login') 
    { 
        middleware(req, res, next);
    } else {
        next();
    }
});

router.use('/', require('./home'));
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

module.exports = router;
