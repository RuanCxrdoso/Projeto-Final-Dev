require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./db");
const port = process.env.PORT || 3000;

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// models
const User = require("./models/userModel");
const News = require("./models/News");

const userRouter = require("./routes/user");

// Config JSON response
app.use(express.json());

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

//User Routes
app.use("/users", userRouter);

// Private Route to get logged-in user's data
app.get("/user", checkToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const secret = process.env.SECRET;

  try {
    // Verify the token to get the user ID
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.id;

    // Get the user's data using the ID from the token
    const user = await User.findById(userId, "-password");

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
});

app.get("/noticias", async (req, res) => {
  try {
    const noticias = await News.find().sort({ data: -1 }); // Ordena por data decrescente
    res.status(200).json(noticias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter as notícias." });
  }
});

//Register News Route
app.post("/noticias/insert", async (req, res) => {
  const { image, title, conteudo, coments, catergoria, data } = req.body;

  if (!image) {
    return res.status(422).json({ msg: "A imagem é obrigatorio!" });
  }
  if (!title) {
    return res.status(422).json({ msg: "O titulo é obrigatorio!" });
  }
  if (!conteudo) {
    return res.status(422).json({ msg: "O conteudo é obrigatorio!" });
  }
  if (!catergoria) {
    return res.status(422).json({ msg: "É obrigatorio informar a catergoria" });
  }
  if (!data) {
    return res.status(422).json({ msg: "É obrigatorio informar a data" });
  }

  const newsExist = await User.findOne({ title: title });

  if (newsExist) {
    return res.status(422).json({ msg: "Esta noticia já esta cadastrado" });
  }

  const news = new News({
    image,
    title,
    conteudo,
    coments,
    catergoria,
    data,
  });

  try {
    await news.save();

    res.status(201).json({ msg: "Noticia cadastrada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Algo aconteceu de errado!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
