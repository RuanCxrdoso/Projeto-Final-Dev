// Função para criar elementos com classe e atributos
function createElement(tagName, className, attributes = {}) {
  const element = document.createElement(tagName);
  element.className = className;

  for (const attribute in attributes) {
    element[attribute] = attributes[attribute];
  }

  return element;
}

// Função para renderizar os cards de notícias
function renderNewsCards(news) {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = ""; // Limpa o conteúdo anterior da div

  news.forEach((article) => {
    const card = createNewsCard(article);
    cardsContainer.appendChild(card);
  });
}

// Função para criar um card de notícia
function createNewsCard(article) {
  const card = createElement("div", "card");
  card.style.visibility = "visible";
  const imgBox = createElement("div", "img-box");
  imgBox.appendChild(
    createElement("img", "card-img-top", {
      src: article.src,
      alt: article.title,
    })
  );

  const cardBody = createElement("div", "card-body");
  cardBody.appendChild(createElement("h3", "", { textContent: article.title }));
  cardBody.appendChild(
    createElement("p", "date", { textContent: article.data })
  );
  cardBody.appendChild(createLink("Notícia Completa", article.link));

  card.appendChild(imgBox);
  card.appendChild(cardBody);

  return card;
}

// Função para criar um link
function createLink(text, href) {
  const link = createElement("a", "", { textContent: text, href: href });
  return link;
}

// Função para atualizar o botão de login com o nome do usuário autenticado
function updateLoginButton(name) {
  const loginBtn = document.getElementById("loginBtn");
  loginBtn.textContent = name;
  loginBtn.href = "/front/src/pages/profile/profile.html";
}

// Função para remover o token de autenticação
function removeAuthToken() {
  localStorage.removeItem("token");
}

// Função para validar a autenticação do usuário
function validateAuthentication(token) {
  fetch("http://localhost:3000/users/validation", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível validar a autenticação.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.isAuthenticated) {
        updateLoginButton(data.name);
        fetchNews();
      } else {
        removeAuthToken();
      }
    })
    .catch((error) => {
      console.error("Erro ao verificar autenticação:", error);
    });
}

// Função para buscar notícias da categoria "Tecnologia"
function fetchNews() {
  fetch("http://localhost:3000/noticias/cat/Tecnologia", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível buscar notícias.");
      }
      return response.json();
    })
    .then((news) => {
      console.log(news);
      renderNewsCards(news);
    })
    .catch((error) => {
      console.error("Erro ao buscar notícias:", error);
    });
}

// Verifica se há um token de autenticação
const token = localStorage.getItem("token");

// Inicializa o aplicativo verificando a autenticação
if (token) {
  validateAuthentication(token);
} else {
  removeAuthToken();
}
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

  if (window.scrollY > 500) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.transform = "translateX(.4rem)";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.transform = "translateX(4rem)";
  }
});

document.getElementById("arrow-box").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollBy(0, -5000);
});

window.sr = ScrollReveal({ reset: true });

ScrollReveal().reveal(".card", {
  delay: 200,
  rotate: {
    x: 100,
  },
});
window.sr;
