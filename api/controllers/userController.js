const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Get All Users Route
exports.findAll = async (req, res) => {
  try {
    const users = await User.find().sort({ data: -1 }); // Ordena por data decrescente
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao obter as notícias." });
  }
};

//Register Route
exports.create = async (req, res) => {
  try {
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

    await user.save();

    res.status(201).json({ msg: "Usuario criado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Algo aconteceu de errado!" });
  }
};

exports.remove = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Algo aconteceu de errado!" });
  }
};

//Login Route
exports.login = async (req, res) => {
  try {
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
};

exports.update = async (req, res) => {};

exports.findById = async (req, res) => {
  const id = req.params.id;

  // check if user exists
  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
};

exports.profile = async (req, res) => {
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
};
