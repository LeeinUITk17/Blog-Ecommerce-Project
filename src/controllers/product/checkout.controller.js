class checkoutController {
    getAll = async (req, res, next) => {
        res.render('product/checkout');
    }
}

module.exports = new checkoutController();