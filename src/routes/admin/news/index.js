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
const {catchAsync}=require('../../../apps/utils/catchAsync');

const newController = require("../../../controllers/admin/news.controller");
const { handleValidate } = require("../../../validates/news.validate");

router.use(express.json());

router.get("/form", catchAsync(newController.getForm));
router.post(
  "/form",
  handleValidate(["name", "description", "status", "ordering"]),
 catchAsync( newController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(newController.getForm));
router.get("/delete/:id", catchAsync(newController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(newController.updateStatus));

router.get("(/:status)?", catchAsync(newController.getAll));  
router.get('(/:status)?', catchAsync(newController.statusCount));

router.post("/changeStatusTool", catchAsync(newController.statusTool));
router.post("/upload/:id", catchAsync(newController.imageUpload));

router.post("/dropzone/:id", upload.array('filepond', 3), catchAsync(newController.dropzoneUpload));

router.post('/deleteImage/:itemId/:imageId', catchAsync(newController.deleteImage));
module.exports = router;
