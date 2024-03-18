const { register, login } = require('../../services/login.service');

class UserController {
     getAll=async(req, res, next)=> {
        try {
            return res.render('product/login');
        } catch (err) {
            next(err);
        }
    };

     register=async(req, res, next) =>{
        try {
            await register(req.body);
            req.flash('success', 'Register successfully');
            res.redirect('/');
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/register');
        }
    };

     login=async(req, res, next)=> {
        try {
            const user = await login(req.body);
            req.session.user = user;
            req.flash('success', 'Login successfully');
            res.redirect('/');
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('/login');
        }
    };
}

module.exports = new UserController();
