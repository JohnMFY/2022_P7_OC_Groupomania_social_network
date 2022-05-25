const multer = require('multer'); // npm install multer TODO for the picture post and express-static for the call on app.js

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//save on disk
const storage = multer.diskStorage({ 
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

//change the name of the picture
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_'); //replace the space with underscore
    const extension = MIME_TYPES[file.mimetype]; 
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');