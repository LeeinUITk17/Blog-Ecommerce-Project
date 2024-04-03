const {
    updateInformation,
    getItemById,
}=require('../../services/user.service');
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
}

module.exports = new accountController();