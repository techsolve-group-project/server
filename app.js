const express = require("express");
const cors = require("cors");

const { router } = require("./routes/root.route");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

io.on("connection", (socket) => {
  // ...
  console.log(socket);
  console.log(socket.id, '<------ connected socket id');
  socket.emit('welcome_msg', 'Welcome to TechSolve Server!')
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
