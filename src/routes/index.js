var express = require('express');
var router = express.Router();
const { verifyToken } = require('../helper/jwt.helper');
const devKey=require('../helper/devkey');
router.use((req, res, next) => {
    const token = req.cookies.jwt;
   // console.log(devKey);
    if (token) {
        const decoded = verifyToken(token, devKey);
     //   console.log(decoded);
        if (decoded) {
            req.user = decoded;
        }
    }
    next();
});

router.use('/admin', require('./admin'));
router.use('/',require('./frontend'));
router.use('/shop',require('./product'));
module.exports = router;
