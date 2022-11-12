import express from "express";
import fs from 'fs';
const route = express.Router();


route.post("/fileread", (req, res,next) => {
  console.log("hello");
  res.end();
});

export default route;
