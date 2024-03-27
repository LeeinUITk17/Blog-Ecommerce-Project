const jwt = require('jsonwebtoken');
const jwtHelper = require('../../helper/jwt.helper');
const { generateToken } = jwtHelper;

class HomepageController {
    getAll = async (req, res) => {
        try {
            const userId = '22521276';
            const username = 'cnttvietnhatk17';
            const token = req.cookies.token;

            if (!token) {
                const newToken = generateToken(userId, username, []);
                res.cookie('token', newToken);
            } else {
                try {
                    const decodedToken = jwt.verify(token, 'cnttvietnhatk17');
                    if (decodedToken.exp - Date.now() / 1000 < 300) {
                        const updatedToken = generateToken(decodedToken.userId, decodedToken.username, []);
                        res.cookie('token', updatedToken);
                    }
                } catch (error) {
                    console.error('JWT Verification Error:', error);

                    if (error.name === 'TokenExpiredError') {
                        const newToken = generateToken(userId, username, []);//if token expired,create new token in overthere!!!
                        res.cookie('token', newToken);
                    } else {
                        return res.status(500).send('Internal Server Error');
                    }
                }
            }
            const user=req.user;
            if(user){
                res.locals.user=user;
            }else{
                res.locals.user=null;
            }
            res.render('product/home');
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new HomepageController();
