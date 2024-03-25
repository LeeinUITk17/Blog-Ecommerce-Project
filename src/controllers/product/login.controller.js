const{
    login : loginService,
    register: registerService,
}=require('../../services/login.service');
const {
    verifyToken,
}=require('../../helper/jwt.helper');
const passport = require('passport');
const devKey='cnttvietnhatk17';
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
       const user= await registerService(req.body);
       req.login(user, (err) => {
        if (err) {
            req.flash('error', err.message);
            return res.render('product/shop/login');
        }
        return res.redirect('/shop'); 
    });
    } catch (err) {
        req.flash('error', err.message);
        return res.render('product/shop/login/form');
    }
};

login = async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user) => {
            if (err) {
                req.flash('error', err.message);
                return res.render('product/shop/login');
            }
            if (!user) {
                req.flash('error', 'Invalid username or password');
                return res.redirect('/shop/login');
            }
            req.login(user, async (err) => {
                if (err) {
                    req.flash('error', err.message);
                    return res.render('product/shop/login');
                }
                try {
                    const token = await loginService(req, req.body);
                  //  console.log(req.body);
                    res.cookie('jwt', token, { httpOnly: true });
                  //  console.log(token);
                    return res.redirect('/shop');
                } catch (error) {
                    req.flash('error', error.message);
                    return res.render('product/shop/login');
                }
            });
        })(req, res, next);
    } catch (err) {
        req.flash('error', err.message);
        return res.render('product/shop/login');
    }
};


}

module.exports = new UserController();