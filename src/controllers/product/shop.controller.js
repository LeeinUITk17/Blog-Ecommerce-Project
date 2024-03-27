class shopController {
    getAll = async (req, res, next) => {
        res.render('product/shop');
    }
}

module.exports = new shopController();