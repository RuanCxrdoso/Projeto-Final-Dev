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
    link.textContent = "Notícia Completa";
    card.dataset.id = noticia._id; // Supondo que noticia.id contenha o ID único da notícia
    card.addEventListener("click", () => {
      const newsId = card.dataset.id; // Obtém o ID da notícia do atributo personalizado
      const newsDetailURL = "/front/src/pages/news/news.html?id=" + newsId;
      link.href = newsDetailURL; // Substitua pela URL completa da notícia
      console.log(newsDetailURL);
      //window.location.href = newsDetailURL; // Redireciona o usuário para a página de detalhes
    });
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

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = Array.from(document.getElementsByClassName("nav-link"));
  const scroll = window.scrollY;
  let screenWidth = window.innerWidth;

  if (scroll > 10 && screenWidth > 992) {
    navbar.classList.add("scroll");
    navbar.style.height = "65px";
    navLinks.forEach((elem) => {
      elem.style.fontSize = "14px";
    });
  } else if (scroll < 10 && screenWidth > 992) {
    navbar.classList.remove("scroll");
    navbar.style.height = "99px";
    navLinks.forEach((elem) => {
      elem.style.fontSize = "16px";
    });
  } else if (screenWidth < 992) {
    navbar.style.height = "auto";
  }

  const scrollBtn = document.getElementById("arrow-box");

  if (window.scrollY > 1000) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.transform = "translateX(.4rem)";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.transform = "translateX(4rem)";
  }
});

document.getElementById("arrow-box").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollBy(0, -10000);
});

window.sr = ScrollReveal({ reset: true });

ScrollReveal().reveal(".card", {
  delay: 300,
  rotate: {
    x: 100,
  },
});

ScrollReveal().reveal(".content-box", {
  delay: 300,
  rotate: {
    x: 100,
  },
});
ScrollReveal().reveal(".splide", {
  delay: 300,
  rotate: {
    x: 100,
  },
});
