const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(router);

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => console.log(err));

require("./config/config");

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
