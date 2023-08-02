import validation from "../../scripts/validation.js";

// Script para fazer o logout
document.getElementById("logout-button").addEventListener("click", () => {
  // Remove o token do localStorage
  localStorage.removeItem("token");

  // Redireciona o usuário para a página inicial
  window.location.href = "/front/src/index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const userNameElement = document.getElementById("user-name");
  const userEmailElement = document.getElementById("user-email");

  // Function to fetch user data from the API and display it on the page
  function fetchUserDataAndDisplay() {
    // Recupere o token do localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Implemente a lógica para redirecionar o usuário para a página de login
      // caso ele tente acessar os dados sem estar logado.
      window.location.href = "/front/src/pages/autenticacao/login/login.html";
      return;
    }

    // Faz a requisição para obter os dados do usuário logado
    fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
      },
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        // Atualize os elementos HTML com os dados do usuário
        userNameElement.textContent = dados.user.name;
        userEmailElement.textContent = dados.user.email;
        console.log(dados.user);
      })
      .catch((erro) => {
        console.error("Erro ao obter os dados do usuário logado:", erro);
      });
  }

  // Call the fetchUserDataAndDisplay function to get and display user data
  fetchUserDataAndDisplay();
});
