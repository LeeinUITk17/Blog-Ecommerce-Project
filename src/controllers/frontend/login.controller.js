const{
    login : loginService,
    register: registerService,
}=require('../../services/login.service');
const passport = require('passport');
class logincontroller {
     getAll=async(req, res, next)=> {
        try {
            return res.render('blogLogin/login',{layout:'blogLogin'});
        } catch (err) {
            next(err);
        }
    };
   getForm=async(req,res,next)=>{
    try{
        return res.render('blogLogin/register',{layout:'blogLogin'});
    }
    catch(err){
        next(err);
    }
   };
    register = async (req, res, next) => {
    try {
        console.table(req.body);
       const user= await registerService(req.body);
      if(!user){
       // req.flash('error', err.message);
       console.log('error');
        return res.render('blogLogin/register',{layout:'blogLogin'});
      }
      else{
        console.log('success');
        return res.render('blogLogin/login',{layout:'blogLogin'});
      }
      
    } catch (err) {
        req.flash('error', err.message);
        return res.render('blogLogin/register',{layout:'blogLogin'});
    }
};

login = async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user) => {
            if (err) {
                req.flash('error', err.message);
                return res.render('blogLogin/login',{layout:'blogLogin'});
            }
            if (!user) {
                req.flash('error', 'Invalid username or password');
                return res.redirect('/login');
            }
            req.login(user, async (err) => {
                if (err) {
                    req.flash('error', err.message);
                    return res.render('blogLogin/login',{layout:'blogLogin'});
                }
                try {
                    const token = await loginService(req, req.body);
                  //  console.log(req.body);
                    res.cookie('jwt', token, { httpOnly: true });
                  //  console.log(token);
                    return res.redirect('/home');
                } catch (error) {
                    req.flash('error', error.message);
                    return res.render('blogLogin/login',{layout:'blogLogin'});
                }
            });
        })(req, res, next);
    } catch (err) {
        req.flash('error', err.message);
        return res.render('blogLogin/login',{layout:'blogLogin'});
    }
};
logout = async (req, res, next) => {
    try {
        res.clearCookie('jwt');
        req.logout((err) => {
            if (err) {
                return next(err); 
            }
            return res.redirect('/home');
        });
    } catch (err) {
        next(err);
    }
};


}

module.exports = new logincontroller();