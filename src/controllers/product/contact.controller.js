class contactController {
    getAll = async (req, res, next) => {
        res.render('product/contact');
    }
}

module.exports = new contactController();