import express from "express";
import multer from "multer";
const route = express.Router();

const upload = multer({ dest: "uploads/" });

route.post("/fileupload", upload.single("avatar"), (req, res,next) => {
  console.log("hello");
  res.end();
});

export default route;
