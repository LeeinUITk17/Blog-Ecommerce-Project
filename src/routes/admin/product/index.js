const express = require("express");
const router = express.Router();
const multer = require('multer');
const randomstring = require('randomstring');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueFileName = randomstring.generate(10) + file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });

const productController = require("../../../controllers/admin/product.controller");
const { handleValidate } = require("../../../validates/news.validate");
router.use(express.json());

router.get("/form", productController.getForm);
router.post(
  "/form",
  handleValidate(["name", "description", "status", "ordering"]),
  productController.addOrUpdateItem
);
router.get("/form/:id", productController.getForm);
router.get("/delete/:id", productController.deleteItem);
router.get('/changeStatus/:id/:status', productController.updateStatus);

router.get("(/:status)?", productController.getAll);  

router.get('(/:status)?',productController.statusCount);

router.post("/changeStatusTool", productController.statusTool);
router.post("/upload/:id", productController.imageUpload);
router.post("/dropzone/:id", upload.array('filepond', 3), productController.dropzoneUpload);

router.post('/deleteImage/:itemId/:imageId', productController.deleteImage);
module.exports = router;
