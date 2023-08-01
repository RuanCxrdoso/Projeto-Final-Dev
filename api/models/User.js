const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: String,
  name: String,
  password: String,
  isAdmin: Boolean,
});

module.exports = User;
