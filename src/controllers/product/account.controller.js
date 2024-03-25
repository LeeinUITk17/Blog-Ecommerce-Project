class accountController {
    getAll = async (req, res, next) => {
        const user=req.user;
        if(user){
          console.log(user);
        }
        res.render('product/account',{user});
    }
}

module.exports = new accountController();