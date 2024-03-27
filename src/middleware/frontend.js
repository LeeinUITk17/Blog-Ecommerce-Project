const frontendService = require('../services/frontend.service');
module.exports=
async(req,res,next)=>{
     Promise.all([
         frontendService.getAllCategory(),
        frontendService.getAllSetting(),
frontendService.getAllNews(),
frontendService.getAllRss(),
                ]).then(([listcategory,datasetting,listnews,SrcRss])=>{
          res.locals.listcategory=listcategory;
 res.locals.datasetting=datasetting;
res.locals.listnews=listnews;
 res.locals.SrcRss=SrcRss;
next();
}).catch((err)=>{
     next(err);
})
}