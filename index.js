require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const openAiRouter = require('./routes/openAi');

const path = require("path");
const { UPLOAD_DIR, UPLOAD_AUDIO_DIR } = require("./config/config");

const PORT = process.env.PORT;

const app = express()

app.use(cookieParser())

//middle ware;
var corOptions = {
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: "*",
    // origin: process.env.CLIENT_ROOT_URI,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,// <= Accept credentials (cookies) sent by the client
}
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/static', express.static(path.join(__dirname, "upload")))

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
    fs.mkdirSync(UPLOAD_AUDIO_DIR);
}
if (!fs.existsSync(UPLOAD_AUDIO_DIR)) {
    fs.mkdirSync(UPLOAD_AUDIO_DIR);
}

app.get('/', (req, res, next) => {
    res.status(200).json({ message: "OpenAi API" });
});

app.use("/openAi", openAiRouter)

app.listen(PORT, () => {
    console.log('server started on port ' + PORT);
})