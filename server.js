if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const apiRouter = require("./routes/api/api");

// set up mongodb connection
mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());
app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("It's working!");
});

app.listen(3000, () => console.log("Listening at port 3000"));
