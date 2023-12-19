const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MONGOURI } = require("./config/keys");
const PORT = 5000;

mongoose.set("strictQuery", true);
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting");
});
require("./models/participants");
require("./models/payments");

app.use(express.json());


app.use(require("./routes/participant"));
app.use(require("./routes/payment"));

app.listen(PORT, () => {
  console.log("Server is Running");
});
