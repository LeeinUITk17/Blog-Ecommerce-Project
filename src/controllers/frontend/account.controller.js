class accountController {
   getInformation=async(req,res,next)=>{
     return res.render('frontend/account/information');
   }
   Uploadform=async(req,res,next)=>{
     return res.render('frontend/account/upload');
   }
   Manageform=async(req,res,next)=>{
     return res.render('frontend/account/manage');
   }
   
}

module.exports = new accountController();