const multer = require('multer');
const path = require('path');

const filetypes = ['image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (_, file, cb) => {
    if (filetypes.includes(file.mimetype)) {
      cb(null, `${Date.now()}-${file.originalname}`);
    } else {
      cb(new Error('File type is not supported'));
    }
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille de fichier : 10 MB
});

