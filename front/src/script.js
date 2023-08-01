function renderizarCards(noticias) {
  const cardsBox = document.getElementById("cards-box");

  noticias.forEach((noticia) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 20rem;";

    const imgBox = document.createElement("div");
    imgBox.className = "img-box";
    const img = document.createElement("img");
    img.src = noticia.image;
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

    cardsBox.appendChild(card);
  });
}

function obterDadosNoticias() {
  fetch("http://localhost:3000/noticias")
    .then((resposta) => resposta.json())
    .then((noticias) => {
      console.log(noticias);
      renderizarCards(noticias);
    })
    .catch((erro) => {
      console.error("Erro:", erro);
    });
}

obterDadosNoticias();
