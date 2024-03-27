const adminService=require('../services/admin.service');
module.exports=
async(req,res,next)=>{
     Promise.all([
         adminService.getAllcontact(),
        adminService.getAllcategory(),
adminService.getAllcategoryProduct(),
adminService.getSetting(),

                ]).then(([listcontact,listcategory,listcategoryProduct,listsetting])=>{
                      res.locals.listcontact=listcontact;
res.locals.listcategory=listcategory;
res.locals.listcategoryProduct=listcategoryProduct;
res.locals.listsetting=listsetting;    

next();
}).catch((err)=>{
     next(err);
})
}