class blogController {
    getAll = async (req, res, next) => {
        res.render('product/blog');
    }
}

module.exports = new blogController();