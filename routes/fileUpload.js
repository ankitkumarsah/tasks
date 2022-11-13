import express from "express";
import multer from "multer";
const route = express.Router();

//set dest path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//for filter the data
const Filter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else if (file.mimetype === null) {
    return cb(new Error("Invalid File Type"), false);
  } else {
    return cb(new Error("Invalid File Type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: Filter,
}).single("img");

route.post("/fileupload", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    console.log(req.file);
    return res.status(200).json({
      fileName: req.file.originalname,
      fileUrl: "http://localhost:5000/public/uploads/" + req.file.originalname,
    });
  });
});

export default route;
