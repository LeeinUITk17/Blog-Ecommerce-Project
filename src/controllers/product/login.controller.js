const{
    login,
    register,
}=require('../../services/login.service');
const passport = require('passport');
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
        await register(req.body);
        await login(req,req.body);
        await passport.authenticate('local', {
            successRedirect:'/shop',
               failureRedirect:'/shop/login',
         })(req, res, next);
    } catch (err) {
        req.flash('error', err.message);
        return res.render('product/shop/login/form');
    }
};

login = async (req, res, next) => {
    try {
      await login(req,req.body);
      await passport.authenticate('local', {
        successRedirect:'/shop',
           failureRedirect:'/shop/login',
     })(req, res, next);
    } catch (err) {
        req.flash('error', err.message);
        return res.render('product/shop/login');
    }
};

}

module.exports = new UserController();
