const jwt = require('jsonwebtoken');
const {
  getItemById,
} = require("../services/productView.service");
const generateToken = (userId, username, productIds) => {
  const secretKey = 'cnttvietnhatk17';

  const payload = {
    userId,
    username,
    productIds
  };
  const expirationTime = Math.floor(Date.now() / 1000) + 7200;

  const options = {
    expiresIn: expirationTime
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

const verifyToken = (token) => {
    const secretKey = 'cnttvietnhatk17';
  
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return null;
    }
};
const decodeToken = (token) => jwt.verify(token, 'cnttvietnhatk17');
const increaseQuantity = (productId, decodedToken, res) => {
    const productIndex = decodedToken.productIds.indexOf(productId);

    if (productIndex !== -1) {
        decodedToken.quantities[productIndex]++;
    } else {
        decodedToken.productIds.push(productId);
        decodedToken.quantities.push(1);
    }
    const updatedToken = generateToken(decodedToken.userId, decodedToken.username, decodedToken.productIds, decodedToken.quantities);
    res.cookie('token', updatedToken);
    updateCart();
};
const decreaseQuantity = (productId, decodedToken, res) => {
    const productIndex = decodedToken.productIds.indexOf(productId);

    if (productIndex !== -1) {
        if (decodedToken.quantities[productIndex] > 1) {
            decodedToken.quantities[productIndex]--;
        } else {
            decodedToken.productIds.splice(productIndex, 1);
            decodedToken.quantities.splice(productIndex, 1);
        }
        const updatedToken = generateToken(decodedToken.userId, decodedToken.username, decodedToken.productIds, decodedToken.quantities);
        res.cookie('token', updatedToken);
        updateCart();
    }
};
const updateCart = () => {
  const token = req.cookies.token;
    const decodedToken = decodeToken(token);
    let subtotal = 0;
    decodedToken.productIds.forEach((productId, index) => {
        const quantity = decodedToken.quantities[index];
        const item = getItemById(productId);
        if (item) {
            subtotal += item.price * quantity;
        }
    });
};

module.exports = {
  generateToken,
  verifyToken,
  increaseQuantity,
  decreaseQuantity,
  updateCart,
};
