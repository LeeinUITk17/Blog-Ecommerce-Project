const { register, login } = require('../../services/login.service');

class UserController {
     getAll=async(req, res, next)=> {
        try {
            return res.render('product/login');
        } catch (err) {
            next(err);
        }
    };
   getForm=async(req,res,next)=>{
    try{
        return res.render('product/login/form');
    }
    catch(err){
        next(err);
    }
   };
   register = async (req, res, next) => {
    try {
        console.table(req.body);
        const user = await register(req.body);
        req.session.user = user;
        return await res.redirect('/shop');
    } catch (err) {
        req.flash('error', err.message);
        return res.render('product/shop/login/form');
    }
};

login = async (req, res, next) => {
    try {
        const user = await login(req.body);
        req.session.user = user;
        console.log(req.session.user);
        return await res.redirect('/shop/home');
    } catch (err) {
        req.flash('error', err.message);
        return res.render('product/shop/login');
    }
};

}

module.exports = new UserController();
