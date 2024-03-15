const express = require('express');
const router = express.Router();
const contactController = require('../../../controllers/admin/contact.controller')
router.get('/form/:id' , contactController.getForm);
router.get('', contactController.getAll);
module.exports = router;