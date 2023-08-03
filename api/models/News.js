const mongoose = require("mongoose");

const News = mongoose.model("News", {
  src: String,
  title: String,
  conteudo: String,
  coments: [],
  catergoria: String,
  data: String,
  link: String,
});

module.exports = News;
