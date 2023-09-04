const token = localStorage.getItem("token");

function renderItensAuth() {
  console.log(token);
  if (token) {
    fetch("http://localhost:3000/users/validation", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar o token no cabeçalho Authorization
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          const loginBtn = document.getElementById("loginBtn");
          loginBtn.textContent = `${data.name}`;
          loginBtn.href = "/front/src/pages/profile/profile.html";
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar autenticação:", error);
        // Lidar com erros, como redirecionar para uma página de erro
      });
  } else {
    localStorage.removeItem("token");
    window.location.href = "/front/src/";
  }
}

renderItensAuth();

function lidarComEnvioFormulario(ev) {
  ev.preventDefault();

  const form = new FormData(ev.target);
  const imagem = form.get("imagem");
  const titulo = form.get("titulo");
  const categoria = document.getElementById("categoria").value; // retorna o 'value' correspondente
  const autor = form.get("autor");
  const conteudo = form.get("conteudo");

  console.log(`
  Imagem: ${imagem}\n
  Título: ${titulo}\n
  Categoria: ${categoria}\n
  Autor: ${autor}\n
  Conteúdo: ${conteudo}
  `);

  const dados = {
    imagem: imagem,
    titulo: titulo,
    categoria: categoria,
    autor: autor,
    conteudo: conteudo,
  };

  fetch("https://localhost:3000/pubNews", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then((response) => response.json())
    .then((dados) => console.log(dados))
    .catch((err) => console.log(err));

  document.querySelector("form").reset();
}

document
  .querySelector("form")
  .addEventListener("submit", lidarComEnvioFormulario);
