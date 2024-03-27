const express = require('express');
const router = express.Router();
const loginController = require('../../../controllers/admin/login.controller')
router.get('/' , loginController.getform);
router.post('/' , loginController.login);
module.exports = router;