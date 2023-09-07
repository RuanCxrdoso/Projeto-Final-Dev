function atualizarBotaoLogin(userName) {
  const loginBtn = document.getElementById("loginBtn");

  if (userName) {
    loginBtn.textContent = `${userName}`;
    loginBtn.href = "/front/src/pages/profile/profile.html";
  } else {
    loginBtn.textContent = "Login"; // Define o texto de volta para "Login" se o usuário não estiver autenticado
    loginBtn.href = "/front/src/pages/login/login.html"; // Atualiza o link para a página de login
  }
}

export default atualizarBotaoLogin();
