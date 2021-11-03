if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const apiRouter = require("./routes/api");

// set up mongodb connection
mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(__dirname + "/client/build"));

app.use("/api", apiRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(process.env.PORT, () =>
  console.log("Listening at port", process.env.PORT)
);
