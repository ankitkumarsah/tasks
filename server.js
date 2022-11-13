import express from "express";
import fileupload from "./routes/fileUpload";
import qrgenerator from "./routes/generateQR";
import fileRead from "./routes/fileRead";

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(qrgenerator);
app.use(fileRead);
app.use(fileupload);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
