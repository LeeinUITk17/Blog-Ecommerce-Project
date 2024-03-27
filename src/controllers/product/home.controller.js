class homeController {
    getAll = async (req, res, next) => {
        res.render('product/home');
    }
}

module.exports = new homeController();