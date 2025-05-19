import multer from 'multer';
import path from 'path';

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Specify the images folder
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname); // Get the file extension
    const fileName = Date.now() + fileExt; // Use timestamp for unique filenames
    cb(null, fileName);
  },
});

// Filter for image file types (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
