const productService = require('../services/product.service');

module.exports=
    async (req, res, next) => {
        Promise.all([
            productService.getAllproduct(),
            productService.getAllcategoryProduct(),
            productService.getAllsetting(),
            productService.getAllnews(),
            productService.getAlladdress(),
        ]).then(([listproduct,listcategoryproduct,listsetting,listnews,listaddress])=>{
            res.locals.listproduct=listproduct;
            res.locals.listcategoryproduct=listcategoryproduct;
            res.locals.listsetting=listsetting;
            res.locals.listnews=listnews;
            res.locals.listaddress=listaddress;
            next();
        }).catch((err)=>{
            next(err);
        })
    }