const{
    addItem,
}=require('../../services/bill.service');
const jwt = require('jsonwebtoken');
const jwtHelper = require('../../helper/jwt.helper');
const {  generateToken } = jwtHelper;
class thanksController {
    getAll = async (req, res, next) => {
        res.render('product/thanks');
    }
    add=async(req,res,next)=>{
       console.log(req.body);
       await addItem(req.body);
       const token = req.cookies.token;
if (token) {
    try {
        const decodedToken = jwt.verify(token, 'cnttvietnhatk17');
        const updatedProductIds = []; 
        const updatedToken = generateToken(decodedToken.userId, decodedToken.username, updatedProductIds);
        res.cookie('token', updatedToken);
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}

       return res.redirect('/shop/thanks');
      }
}

module.exports = new thanksController();