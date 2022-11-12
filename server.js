import express from 'express';
const app = express();
const PORT = 5000;

//import fileupload route from routes folder
import fileupload from './routes/fileUpload';


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})