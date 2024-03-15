const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
} = require("../../services/productView.service");
const jwt = require('jsonwebtoken');
  const jwtHelper = require('../../helper/jwt.helper');
const {  generateToken,
    verifyToken,
    } = jwtHelper;
class checkoutController {
    getAll = async (req, res, next) => {
      try {
        const userId = '22521276';
        const username = 'cnttvietnhatk17';
        const token = req.cookies.token;

        if (!token) {
            const newToken = generateToken(userId, username, [id]); 
            res.cookie('token', newToken);
        }
        try {
            const decodedToken = jwt.verify(token, 'cnttvietnhatk17');
            const productIds = decodedToken.productIds || [];
                console.log(decodedToken);
                const data=[];
                for(let i=0;i<productIds.length;i++){
                    data.push(await getItemById(productIds[i]));
                }
                console.log(data);
            return res.render('product/checkout', { data });
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    }
}

module.exports = new checkoutController();