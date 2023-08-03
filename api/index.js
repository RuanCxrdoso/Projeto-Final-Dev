require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");
const port = process.env.PORT || 3000;

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// models
const newsRouter = require("./routes/news");
const userRouter = require("./routes/user");

// Config JSON response
app.use(express.json());

//News Routes
app.use("/noticias", newsRouter);
//User Routes
app.use("/users", userRouter);

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
