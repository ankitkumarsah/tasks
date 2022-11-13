import express from "express";
import fs from "fs";
import path from "path";
const route = express.Router();

route.get("/fileread", async (req, res) => {


  try {
     //Read English File Data
  const english = await fs.promises.readFile(
    path.join(__dirname, "../staticfiles/english_language.json"),
    "utf8"
  );

  //Read Hindi File Data
  const hindi = await fs.promises.readFile(
    path.join(__dirname, "../staticfiles/hindi_language.json"),
    "utf8"
  );
  const hindiData = JSON.parse(hindi);
  const englishData = JSON.parse(english);
  
  //return data
  return res.status(200).json({ hindiData, englishData });
  } catch (error) {
    return res.status(200).json({ errormsg:"Oops! Something Went Wrong" });
  }
 
 

});

export default route;
