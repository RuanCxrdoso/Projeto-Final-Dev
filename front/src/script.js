const token = localStorage.getItem("token");
import validation from "./scripts/validation.js";

function renderizarCards(noticias) {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.textContent = ""; // Limpa o conteúdo anterior da div

  noticias.forEach((noticia) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 20rem;";

    const imgBox = document.createElement("div");
    imgBox.className = "img-box";
    const img = document.createElement("img");
    img.src = noticia.src;
    img.className = "card-img-top";
    img.alt = noticia.title;
    imgBox.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.textContent = noticia.title;
    cardBody.appendChild(titulo);

    const data = document.createElement("p");
    data.textContent = noticia.data;
    data.className = "date";
    cardBody.appendChild(data);

    const link = document.createElement("a");
    link.href = noticia.link; // Substitua pela URL completa da notícia
    link.textContent = "Notícia Completa";
    cardBody.appendChild(link);

    card.appendChild(imgBox);
    card.appendChild(cardBody);

    cardsContainer.appendChild(card);
  });
}

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
          fetch("http://localhost:3000/noticias")
            .then((resposta) => resposta.json())
            .then((noticias) => {
              console.log(noticias);
              renderizarCards(noticias);
            })
            .catch((erro) => {
              console.error("Erro:", erro);
            });
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar autenticação:", error);
        // Lidar com erros, como redirecionar para uma página de erro
      });
  }
}

renderItensAuth();
