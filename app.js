const express = require("express");
const cors = require("cors");

const { router } = require("./routes/root.route");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
