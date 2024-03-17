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
    increaseQuantity,
    decreaseQuantity,
    updateCart, } = jwtHelper;

class cartController {
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
                return res.render('product/cart', { data,tokenData: decodedToken });
            } catch (error) {
                console.error('JWT Verification Error:', error);
                return res.status(500).send('Internal Server Error');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
    addCart = async (req, res, next) => {
        const { id } = req.body;
    
        if (!id) {
            return res.redirect('/shop/cart');
        }
    
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
                productIds.push(id);
                const updatedToken = generateToken(decodedToken.userId, decodedToken.username, productIds);
                res.cookie('token', updatedToken);
                    console.log(decodedToken);
                    const data=[];
                    for(let i=0;i<productIds.length;i++){
                        data.push(await getItemById(productIds[i]));
                    }
                    console.log(data);
                return res.render('product/cart', { data,tokenData: decodedToken });
            } catch (error) {
                console.error('JWT Verification Error:', error);
                return res.status(500).send('Internal Server Error');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    };
    deleteCart = async (req, res, next) => {
        const { id } = req.params;
    
        if (!id) {
            return res.redirect('/shop/cart');
        }
    
        try {
            const token = req.cookies.token;
    
            if (token) {
                try {
                    const decodedToken = jwt.verify(token, 'cnttvietnhatk17');
                    const productIds = decodedToken.productIds || [];
                    const updatedProductIds = productIds.filter((productId) => productId !== id);
                    const updatedToken = generateToken(decodedToken.userId, decodedToken.username, updatedProductIds);
                    res.cookie('token', updatedToken);
                        console.log(decodedToken);
                        const data=[];
                        for(let i=0;i<updatedProductIds.length;i++){
                            data.push(await getItemById(updatedProductIds[i]));
                        }
                        console.log(data);
                    return res.render('product/cart', { data,tokenData: decodedToken });
                } catch (error) {
                    console.error('JWT Verification Error:', error);
                    return res.status(500).send('Internal Server Error');
                }
            }
           
        } catch (error) {
            console.error(error);
            return res.redirect('/shop/cart');
        }
    };
}

module.exports = new cartController();