class serviceController {
    getAll = async (req, res, next) => {
        res.render('product/service');
    }
}

module.exports = new serviceController();