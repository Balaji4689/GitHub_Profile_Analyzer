

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => { console.log("MongoDB Connected Successfully");})
  .catch((error) => { console.log("MongoDB Connection Error:", error); });

app.get("/get", (req, res) => {
  res.send("GitHub Profile Analyzer API Running");
});


const githubRoutes = require("./routes/githubRoutes");
app.use("/api", githubRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});