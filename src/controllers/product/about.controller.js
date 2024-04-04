class aboutController {
    getAll = async (req, res, next) => {
       // throw new Error('error check');
        res.render('product/about');
    }
}

module.exports = new aboutController();