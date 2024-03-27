

class loginController {
    getform = async (req, res, next) => {
        res.render('form')
}
}
module.exports = new loginController();
