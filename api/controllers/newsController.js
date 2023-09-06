const News = require("../models/newsModel");
const fs = require("fs");

exports.findAll = async (req, res) => {
  try {
    const noticias = await News.find().sort({ data: -1 }); // Ordena por data decrescente
    res.status(200).json(noticias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter as notícias." });
  }
};

exports.findByCategorie = async (req, res) => {
  const excludedCategories = ["Esporte", "Tecnologia", "Arte"];
  try {
    const { categoria } = req.params;
    if (categoria === "Outros") {
      const news = await News.find({
        categoria: { $nin: excludedCategories },
      });

      res.status(200).json(news);
    } else {
      const news = await News.find({ categoria: categoria });

      res.status(200).json(news);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter as notícias." });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, conteudo, coments, categoria, data } = req.body;
    const file = req.file;

    if (!file) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(422).json({ msg: "A imagem é obrigatorio!" });
    }
    if (!title) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(422).json({ msg: "O titulo é obrigatorio!" });
    }
    if (!conteudo) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(422).json({ msg: "O conteudo é obrigatorio!" });
    }
    if (!categoria) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(422)
        .json({ msg: "É obrigatorio informar a categoria" });
    }

    const newsExist = await News.findOne({ conteudo: conteudo });

    if (newsExist) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(422).json({ msg: "Esta noticia já esta cadastrado" });
    }

    const news = new News({
      src: file.path.slice(85),
      title,
      conteudo,
      coments,
      categoria,
      data,
    });

    await news.save();

    res.status(201).json({ msg: "Noticia cadastrada com sucesso!" });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.log(err);
    res.status(500).json({ msg: "Algo aconteceu de errado!" });
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id; // Extrai o 'id' dos parâmetros de rota
    const news = await News.find({
      _id: id,
    });
    res.status(200).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter as notícias." });
  }
};
