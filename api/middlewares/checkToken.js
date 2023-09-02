function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    // Se o token for válido, continue com a solicitação
    next();
  } catch (err) {
    // Se o token for inválido, responda com erro 401
    res.status(401).json({ msg: "Token inválido!" });
  }
}

module.exports = checkToken;
