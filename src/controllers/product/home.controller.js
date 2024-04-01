const jwt = require('jsonwebtoken');
const jwtHelper = require('../../helper/jwt.helper');
const { generateToken } = jwtHelper;
const Message = require('../../model/message.model');
const io = require('socket.io')();

class HomepageController {
    constructor() {
        this.messages = [];
        this.io = io;
    }

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
                    if (error.name === 'TokenExpiredError') {
                        const newToken = generateToken(userId, username, []);
                        res.cookie('token', newToken);
                    } else {
                        return res.status(500).send('Internal Server Error');
                    }
                }
            }

            const user = req.user;
            res.locals.user = user ? user : null;
            res.render('product/home');
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    handleChatMessage(socket) {
        socket.on('chat message', (msg) => {
            const newMessage = new Message(socket.id, msg);
            this.messages.push(newMessage);
            this.io.emit('chat message', newMessage);
        });
    }
}

module.exports = new HomepageController();
