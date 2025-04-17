import multer from "multer";

// Multer memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpeg, .png, and .jpg formats are allowed!"));
  }
  
  cb(null, true); // Accept the file
};

// Multer configuration with memory storage and file filter
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});
