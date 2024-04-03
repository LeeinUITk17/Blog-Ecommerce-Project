
const{
    login : loginService,
}=require('../../services/login.service');
const passport = require('passport');
class loginController {
    getform = async (req, res, next) => {
      return res.render('login',{layout:'login'});
}
login = async (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', async (err, user) => {
      //  console.log('in head');
        try {
            if (err) {
                console.log('error 1')
                req.flash('error', err.message);
                return res.render('login', { layout: 'login' });
            }
            if (!user) {
                console.log('error 2')
                req.flash('error', 'Invalid username or password');
                return res.redirect('/admin/login');
            }
            req.login(user, async (err) => {
                if (err) {
                    console.log('error 3')
                    req.flash('error', err.message);
                    return res.render('login', { layout: 'login' });
                }
                const token = await loginService(req, req.body);
                res.cookie('jwt', token, { httpOnly: true });
                res.redirect('/admin');
            });
        } catch (error) {
            req.flash('error', error.message);
            console.log('error in overthere')
            return res.render('login', { layout: 'login' });
        }
    })(req, res, next);
};


}
module.exports = new loginController();
