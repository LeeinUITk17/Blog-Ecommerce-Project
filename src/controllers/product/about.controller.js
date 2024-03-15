class aboutController {
    getAll = async (req, res, next) => {
        res.render('product/about');
    }
}

module.exports = new aboutController();