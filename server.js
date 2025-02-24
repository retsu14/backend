require("dotenv").config();
const express = require("express");
const connectDb = require("./db/dbConfig");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Bearer"],
  })
);
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api/auth", require("./routes/auth/auth-route"));
app.use("/api/blueprints", require("./routes/blueprint/blueprint-route"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
