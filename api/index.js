require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// models
const newsRouter = require("./routes/news");
const userRouter = require("./routes/user");
const commentsRouter = require("./routes/comments");

// Config JSON response
app.use(express.json());

//News Routes
app.use("/noticias", newsRouter);
//User Routes
app.use("/users", userRouter);
//Comments Routes
app.use("/comments", commentsRouter);

let caminho = path.join(__dirname, "../api/public/uploads");

app.use("/uploads", express.static(path.join(caminho)));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota GET para acessar os arquivos na pasta "/uploads"
app.get("/uploads/:nomeDoArquivo", (req, res) => {
  const { nomeDoArquivo } = req.params;
  // Verifique se o arquivo existe na pasta "/uploads"
  const arquivoPath = path.join(caminho, nomeDoArquivo);

  res.sendFile(arquivoPath, (err) => {
    if (err) {
      // Se houver um erro ao enviar o arquivo, retorne um status 404 (não encontrado)
      res.status(404).send("Arquivo não encontrado");
    }
  });
});

// Open Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
