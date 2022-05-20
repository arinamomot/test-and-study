require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./router");
const errorMiddleware = require("./middlewares/error-middleware");
const multer = require("multer");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(haltOnTimedout)

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);
app.use(multer);

app.get("/", (req, res) => {
  res.send("APP IS RUNNING.");
});

const path = require("path");

// app.use('/',express.static(__dirname));

//... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));
// express.static(path.join(__dirname, '/client/public'));
// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
