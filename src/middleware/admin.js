const adminService=require('../services/admin.service');
module.exports=
async(req,res,next)=>{
     Promise.all([
         adminService.getAllcontact(),
        adminService.getAllcategory(),
adminService.getAllcategoryProduct(),
adminService.getSetting(),
<<<<<<< HEAD

                ]).then(([listcontact,listcategory,listcategoryProduct,listsetting])=>{
=======
adminService.getNews(),
adminService.getBill(),
adminService.getUser(),
                ]).then(([listcontact,listcategory,listcategoryProduct,listsetting,listnews,listbill,listuser])=>{
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
                      res.locals.listcontact=listcontact;
res.locals.listcategory=listcategory;
res.locals.listcategoryProduct=listcategoryProduct;
res.locals.listsetting=listsetting;    
<<<<<<< HEAD

=======
res.locals.listnews=listnews;
res.locals.listbill=listbill;
res.locals.listuser=listuser;
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
next();
}).catch((err)=>{
     next(err);
})
}