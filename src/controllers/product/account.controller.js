const {
    updateInformation,
    getItemById,
}=require('../../services/user.service');
const {
    addItem,
    getItemBySalerID,
}=require('../../services/product.admin.service')
class accountController {
    getAll = async (req, res, next) => {
       // const user=req.user;
        const auth= await getItemById(req.user._id);
        console.log(auth);
        auth?res.render('product/account',{auth}):res.redirect('/shop/login'); 
    }
    updateInformation=async(req,res,next)=>{
        const id=req.user._id;
        console.log(req.body);
        try {
        await updateInformation(id,req.body);
            res.redirect('/shop/account');
        } catch (error) {
            console.log('update fail'+ error);
            res.redirect('/shop/account');
        }
    }
    saleUploadForm=async(req,res,next)=>{
       return res.render('product/saleUpload');
    }
    saleUpload=async(req,res,next)=>{
        console.log(req.body);
        //console.log(req.files);
        await addItem(req.body);
        return res.redirect('/shop/account/manager');
    }
    saleManage=async(req,res,next)=>{
        const data=await getItemBySalerID(req.user._id);
        console.log(data);  
       return res.render('product/saleManage',{data});
    }
}

module.exports = new accountController();