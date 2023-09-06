const token = localStorage.getItem("token");

function createCardElement(noticia) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.visibility = "visible";

  const imgBox = document.createElement("div");
  imgBox.className = "img-box";

  const img = document.createElement("img");
  const url = "http://localhost:3000/uploads/" + noticia.src;

  fetchImage(url).then((blob) => {
    img.src = URL.createObjectURL(blob);
    img.className = "card-img-top";
    img.alt = noticia.title;
    imgBox.appendChild(img);
  });

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = createTextElement("h3", noticia.title);
  const date = createTextElement("p", noticia.data, "date");
  const newsDetailURL = "/front/src/pages/news/news.html?id=" + noticia._id;
  const link = createLinkElement("Notícia Completa", newsDetailURL);

  cardBody.appendChild(title);
  cardBody.appendChild(date);
  cardBody.appendChild(link);

  card.appendChild(imgBox);
  card.appendChild(cardBody);

  return card;
}

function createTextElement(tagName, text, className = "") {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (className) {
    element.className = className;
  }
  return element;
}

function createLinkElement(text, href) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  return link;
}

function fetchImage(url) {
  return fetch(url).then((response) => response.blob());
}

function renderNewsCards(noticias) {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = ""; // Limpa o conteúdo anterior da div

  noticias.forEach((noticia) => {
    const card = createCardElement(noticia);
    cardsContainer.appendChild(card);
  });
}

function renderItensAuth() {
  if (token) {
    fetch("http://localhost:3000/users/validation", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          const loginBtn = document.getElementById("loginBtn");
          loginBtn.textContent = data.name;
          loginBtn.href = "/front/src/pages/profile/profile.html";
          fetch("http://localhost:3000/noticias/cat/Arte", {
            method: "GET",
          })
            .then((response) => response.json())
            .then((noticias) => {
              console.log(noticias);
              renderNewsCards(noticias);
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((error) => {
        console.error("Erro ao verificar autenticação:", error);
      });
  }
}

renderItensAuth();

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = Array.from(document.getElementsByClassName("nav-link"));
  const scroll = window.scrollY;
  const screenWidth = window.innerWidth;

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

  if (window.scrollY > 300) {
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
