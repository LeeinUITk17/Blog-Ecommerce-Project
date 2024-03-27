class loginController {
    getAll = async (req, res, next) => {
        res.render('product/login');
    }
}

module.exports = new loginController();