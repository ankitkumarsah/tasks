import express from "express";
import QRCode from "qrcode";
import crypto from "crypto";
const route = express.Router();

var algorithm = "aes-192-cbc";
var secret = "omsairam";
var key = crypto.scryptSync(secret, "salt", 24);
var iv = crypto.randomBytes(16);

route.get("/qr/genrate", async (req, res) => {
  const personlInfo = {
    name: "Ankit Sah",
    email: "aksah3727@gmail.com",
    mobile: 9472283727,
  };

  const data = JSON.stringify(personlInfo);

  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedData =
      cipher.update(data, "utf8", "hex") + cipher.final("hex");

    const qr = await QRCode.toDataURL(encryptedData);
    //console.log(await QRCode.toString(data))

    const decrypturl = "http://localhost:5000/qr/scan/" + encryptedData;
    return res.status(200).json({ decrypturl: decrypturl, imgurl: qr });
  } catch (error) {
    return res.status(200).json({ errormsg: "Oops! Something Went Wrong" });
  }
});

//for decrypt the data
route.get("/qr/scan/:data", (req, res) => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted =
      decipher.update(req.params.data, "hex", "utf8") + decipher.final("utf8");
    const data = JSON.parse(decrypted);
    return res.status(200).json({ decrypted: data });
  } catch (error) {
    return res.status(200).json({ errormsg: "Oops! Something Went Wrong" });
  }
});
export default route;
