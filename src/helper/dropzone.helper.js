const multer = require('multer');
const path = require('path');
const randomstring = require('randomstring');

const dropzone = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            const uniqueFileName = randomstring.generate(10) + path.extname(file.originalname);
            cb(null, uniqueFileName);
        },
    }),
    limits: {
        fileSize: 8 * 1024 * 1024, // 8 MB file size limit
    },
});

module.exports = {
    dropzone,
};
