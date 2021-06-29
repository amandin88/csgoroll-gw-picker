//jshint esversion:6
require("ejs");

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// import routes
const homeRoutes = require("./routes/home");

app.use("/", homeRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
