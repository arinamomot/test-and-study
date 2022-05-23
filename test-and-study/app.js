require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");
const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
    credentials: true,
    optionSuccessStatus:200,
    origin: process.env.CLIENT_URL
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(
    bodyParser.json()
);
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to the database"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.sendStatus(404);
});

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(404);
});

app.use(haltOnTimedout)

app.use("/api", router);
app.use(errorMiddleware);
app.use(multer);

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
}

app.listen(PORT, () =>
    console.log(`App has been started on port ${PORT}...`)
);
