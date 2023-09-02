const mongoose = require("mongoose");

const News = mongoose.model("News", {
  src: { type: String, required: true },
  title: { type: String, required: true },
  conteudo: { type: String, unique: true, required: true },
  coments: { type: Array, default: [] },
  catergoria: { type: String, required: true },
  data: { type: String, required: true },
});

module.exports = News;
