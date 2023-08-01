require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// models
const User = require("./models/User");
const News = require("./models/News");

// Config JSON response
app.use(express.json());

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // check if user exists
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

//Register Route
app.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "O nome é obrigatorio!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatorio!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatorio!" });
  }
  if (!isAdmin) {
    return res
      .status(422)
      .json({ msg: "É obrigatorio informar o nivel de acesso" });
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({ msg: "Este email já esta cadastrado" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
    isAdmin,
  });

  try {
    await user.save();

    res.status(201).json({ msg: "Usuario criado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Algo aconteceu de errado!" });
  }
});

//Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatorio!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatorio!" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ msg: "Usuario não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    res
      .status(200)
      .json({ msg: "Autenticação reazlizada com sucesso!", token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "Algo de errado aconteceu, tente novamente mais tarde!" });
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

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8rqornl.mongodb.net/`
  )

  .then(() => {
    console.log("Conectou ao banco!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
