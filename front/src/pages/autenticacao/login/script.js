// Função para lidar com o envio do formulário
function lidarComEnvioFormulario(evento) {
  evento.preventDefault(); // Impede o envio padrão do formulário

  // Obter os dados do formulário
  const formularioDados = new FormData(evento.target);
  const email = formularioDados.get("email");
  const senha = formularioDados.get("password");

  // Criar um objeto JSON com o email e a senha
  const dados = {
    email: email,
    password: senha,
  };

  // Enviar os dados para a sua API usando fetch
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((resposta) => resposta.json())
    .then((dados) => {
      localStorage.setItem("token", dados.token);
      console.log("Usuário logado com sucesso!");
      // Redirecione o usuário para a página desejada após o login
      window.location.href = "/front/src/index.html";
    })
    .catch((erro) => {
      // Lidar com quaisquer erros que ocorreram durante o fetch
      console.error("Erro:", erro);
    });
}

// Adicionar um event listener para o evento "submit" do formulário
const formulario = document.getElementById("loginForm");
formulario.addEventListener("submit", lidarComEnvioFormulario);
