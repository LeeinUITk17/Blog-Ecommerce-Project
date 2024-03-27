var express = require('express');
var router = express.Router();
<<<<<<< HEAD
=======
// const { verifyToken } = require('../helper/jwt.helper');
// const devKey=require('../helper/devkey');
// router.use((req, res, next) => {
//     const token = req.cookies.jwt;
//    // console.log(devKey);
//     if (token) {
//         const decoded = verifyToken(token, devKey);
//      //   console.log(decoded);
//         if (decoded) {
//             req.user = decoded;
//         }
//     }
//     next();
// });

>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
router.use('/admin', require('./admin'));
router.use('/',require('./product'));
module.exports = router;
