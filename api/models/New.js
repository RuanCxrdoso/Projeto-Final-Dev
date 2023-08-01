import User from "./User";
const mongoose = require("mongoose");

const New = mongoose.model("User", {
  image: String,
  title: String,
  conteudo: String,
  autor: User,
  coments: Array,
  catergoria: String,
});

module.exports = New;
