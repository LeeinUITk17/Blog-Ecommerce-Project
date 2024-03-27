class accountController {
    getAll = async (req, res, next) => {
        const user=req.user;
        user?res.render('product/account',{user}):res.redirect('/shop/login'); 
    }
}

module.exports = new accountController();