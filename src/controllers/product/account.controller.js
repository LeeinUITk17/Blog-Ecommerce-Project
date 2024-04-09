const {
    updateInformation,
    getItemById,
    updateItem,
}=require('../../services/user.service');
const {
    addItem,
    getItemBySalerID,
    getItemById: productID,
    updateItem: productUpdate,
}=require('../../services/product.admin.service')
const {
    imageHelper,
}=require('../../helper/news.helper');
const path=require('path');
class accountController {
    getAll = async (req, res, next) => {
       // const user=req.user;
        const auth= await getItemById(req.user._id);
        console.log(auth);
        auth?res.render('product/account',{auth}):res.redirect('/shop/login'); 
    }
    updateInformation=async(req,res,next)=>{
        const id=req.user._id;
   // console.table(req.body);
        try {
        await updateInformation(id,req.body);
            res.redirect('/shop/account');
        } catch (error) {
            console.log('update fail'+ error);
            res.redirect('/shop/account');
        }
    }
    saleUploadForm=async(req,res,next)=>{
        const {id}=req.params;
        const data= await productID(id);
        if(data){
            res.render('product/saleUpload/view',{data});
        }
        else{
            res.render('product/saleUpload');
        }
    }
    saleUpload=async(req,res,next)=>{
        console.log(req.body);
        //console.log(req.files);
        await addItem(req.body);
         res.redirect('/shop/account/manager');
    }
    saleManage=async(req,res,next)=>{
        const data=await getItemBySalerID(req.user._id);
        console.log(data);  
        res.render('product/saleManage',{data});
    }
    imageUpload = async (req, res, next) => {
        const id=req.user._id;    
        imageHelper(req, res, async (err) => {
          try {
            const filePath = path.join(req.file.filename);
            req.body.file = filePath;
            await updateItem(id, { avatar: filePath });
            console.log(`Updated image for user with id ${id}`);
            res.redirect(`/shop/account`);
          } catch (error) {
            console.error('Error processing form:', error);
            res.redirect(`/shop/account`);
          }
        });
      };
      productUpload=async(req,res,next)=>{
        const {id}=req.params; 
        imageHelper(req, res, async (err) => {
          try {
            const filePath = path.join(req.file.filename);
            req.body.file = filePath;
            await productUpdate(id, { avatar: filePath });
            console.log(`Updated image for product with id ${id}`);
            res.redirect(`/shop/account/manager`);
          } catch (error) {
            console.error('Error processing form:', error);
            res.redirect(`/shop/account/manager`);
          }
        });
      }
}

module.exports = new accountController();