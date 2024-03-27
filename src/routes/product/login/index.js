const express = require('express');
const loginController = require('../../../controllers/product/login.controller');
const router = express.Router();

router.get('/', loginController.getAll);
router.get('/form',loginController.getForm);
router.post('/form', loginController.register);
router.post('/login', loginController.login);
router.get('/out', loginController.logout);
module.exports = router;
