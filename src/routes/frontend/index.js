const express = require('express');
const frontendService = require('../../services/frontend.service');
//const adminService=require('../../services/admin.service');
const router = express.Router();
const middleware = require('../../middleware/frontend');

router.use((req, res, next) => {
    req.app.set('layout','frontend');
    middleware(req, res, next);
    
});



router.use('/', require('./home'));
router.use('/home',require('./home'));
router.use('/news', require('./news'));
router.use('/contact', require('./contact'));
router.use('/about', require('./about'));
router.use('/category', require('./category'));
router.use('/rss',require('./rss'));
module.exports = router;
