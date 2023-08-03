const mongoose = require("mongoose");

const News = mongoose.model("News", {
  src: { type: String, required: true },
  title: { type: String, required: true },
  conteudo: { type: String, unique: true, required: true },
  coments: [],
  catergoria: { type: String, required: true },
  data: { type: String, required: true },
  link: String,
});

module.exports = News;
