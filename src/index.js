require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();

mongoose.connect(process.env.URL_DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Projeto rodando na porta ${port}`);
});
