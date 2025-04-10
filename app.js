if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const { router } = require("./routes/root.route");
const errorHandler = require("./middlewares/errorHandler");

const { QuestionPost, Comment, User } = require("./models");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

io.on("connection", (socket) => {
  // ...
  console.log(socket);
  console.log(socket.id, "<------ connected socket id");
  socket.emit("welcome_msg", "Welcome to TechSolve Server!");
  socket.on("post:question", async (arg) => {
    try {
      console.log(arg, "<-----------");
      const questions = await QuestionPost.findByPk(arg, {
        include: [
          { model: User, attributes: ["id", "name", "email"] },
          {
            model: Comment,
            attributes: ["id", "UserId", "text", "vote", "createdAt"],
            order: [["vote", "DESC"]],
            separate: true,
            include: { model: User, attributes: ["id", "name", "email"] },
          },
        ],
      });
      io.emit("question:info", questions);
    } catch (error) {
      console.log(error);
    }
  });
});

PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
