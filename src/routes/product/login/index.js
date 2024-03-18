const express = require('express');
const loginController = require('../../../controllers/product/login.controller');
const router = express.Router();

router.get('/', loginController.getAll);
router.post('/register', loginController.register);
router.post('/login', loginController.login);

module.exports = router;
