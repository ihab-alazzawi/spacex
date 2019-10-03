const express = require("express");
const path = require("path");
const connectDB = require("./config/db").connectDB;
const bodyParser = require("body-parser");
const cors = require("cors");
const rockets = require("./routes/api/rockets");

const app = express();

//Connect Database
connectDB();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register api routes
app.use("/api/rockets", rockets);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
