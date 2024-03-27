<<<<<<< HEAD
const express=require('express');
const router=express.Router();
const loginController = require('../../../controllers/product/login.controller')
router.get('' , loginController.getAll);
module.exports = router;
=======
const express = require('express');
const loginController = require('../../../controllers/product/login.controller');
const router = express.Router();

router.get('/', loginController.getAll);
router.get('/form',loginController.getForm);
router.post('/form', loginController.register);
router.post('/login', loginController.login);
router.get('/out', loginController.logout);
module.exports = router;
>>>>>>> cf89cc5b5dbe6795b4da8168c8dc382d85cd83e5
