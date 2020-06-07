require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketIo(server);

mongoose.connect(process.env.URL_DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

io.on("connection", (socket) => {
  const { company_id: companyId } = socket.handshake.query;

  connectedUsers[companyId] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Projeto rodando na porta ${port}`);
});
