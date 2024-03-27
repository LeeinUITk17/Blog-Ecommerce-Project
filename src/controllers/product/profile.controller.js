class profileController {
    getAll = async (req, res, next) => {
        res.render('product/profile');
    }
}

module.exports = new profileController();