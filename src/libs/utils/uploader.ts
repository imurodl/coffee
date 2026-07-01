import path from "path";
import multer from "multer";
import { v4 } from "uuid";

/** MULTER IMAGE UPLOADER */
function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address);
  return multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB per file
    fileFilter: (req, file, cb) => {
      if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Only image files (jpg, png, webp, svg) are allowed"));
    },
  });
};

export default makeUploader;

/*
const product_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    const extension = path.parse(file.originalname).ext;
    const random_name = v4() + extension;
    cb(null, random_name);
  },
});

export const uploadProductImage = multer({ storage: product_storage });
*/
