// middleware.js
const multer = require('multer');
const path = require('path');
  

module.exports = {
  upload: multer({
    storage : multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './public/images/');
        },
        filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
  })
};