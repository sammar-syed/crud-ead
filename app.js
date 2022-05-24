import express from "express";
import connectDB from "./db/connectdb.js";
import { join } from 'path';
import web from "./routes/web.js";
import fileUpload from "express-fileupload";
import body_parser from "body-parser";
const app = express()
app.use(fileUpload());
// app.use(body_parser.json())

const port = process.env.PORT || '3003'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// Database Connection
connectDB(DATABASE_URL);

app.use(express.urlencoded({ extended: false }))

// Static Files
app.use("/student", express.static(join(process.cwd(), "public")))
app.use("/student/edit", express.static(join(process.cwd(), "public")))

// Set Template Engine

app.set("view engine", "ejs");

// Load Routes
app.use("/student", web)


// Image Upload code
app.post("/img-upload", async (req, res) => {

    const file_obj = req.files.img;
    const savedData = await model_person.create({
        img: file_obj.name
    })
    file_obj.mv(`./public/img/` + file_obj.name, async (e) => {
        if (e) {

            console.log("image uploaded error");

        }
        else {
            console.log("image uploaded");
        }
    })

    //   console.log(req.files);
    res.redirect("/")
});




app.post('/update', async (req, res) => {
    const img = req.files.img;


    const savedData = await model_person.updateOne({ _id: id }, { $set: { img: img.name } })
    img.mv(`./public/img/` + img.name, async (e) => {
        if (e) {

            console.log("image uploaded error");

        }
        else {
            console.log("image uploaded");
        }
    })

    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})



export default connectDB;