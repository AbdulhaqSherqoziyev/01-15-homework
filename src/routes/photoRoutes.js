const express = require("express");
const multer = require("multer");
const path = require("path");
const { photoController } = require("../controllers/photoController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const photoRouter = express.Router();

// Fayl mavjudligini tekshirish
const checkFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded!" });
  }
  next();
};

// Faylni yuklash va controllerga o'tish
photoRouter.post(
  "/",
  upload.single("image"),
  checkFileUpload,
  photoController.create
);
photoRouter.get("/", photoController.findAll);
photoRouter.get("/:id", photoController.findOne);
photoRouter.put(
  "/:id",
  upload.single("image"),
  checkFileUpload,
  photoController.update
);
photoRouter.delete("/:id", photoController.delete);

module.exports = { photoRouter };