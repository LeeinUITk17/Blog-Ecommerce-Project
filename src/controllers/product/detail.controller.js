class detailController {
    getAll = async (req, res, next) => {
        res.render('product/detail');
    }
}

module.exports = new detailController();