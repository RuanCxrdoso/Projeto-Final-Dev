const token = localStorage.getItem("token");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const newsId = urlParams.get("id");

// Selecione o botão pelo ID
const postCommentBotao = document.getElementById("comment-btn");
// Adicione um ouvinte de evento para o clique

function renderizarDadosDaNoticia(news) {
  const tituloElement = document.getElementById("titulo");
  const imagemElement = document.getElementById("top-img");
  const conteudoElement = document.getElementById("notice p");
  tituloElement.textContent = news.title; // Altere "title" para o campo correto no objeto de notícia
  imagemElement.src = news.src; // Altere "imageURL" para o campo correto no objeto de notícia
  conteudoElement.textContent = news.conteudo; // Altere "content" para o campo correto no objeto de notícia
}

function renderizarComentarios(comentarios) {
  const commentArea = document.getElementById("comments-id");
  // commentArea.textContent = ""; // Limpa a área de comentários antes de adicionar os novos

  comentarios.forEach((comentario) => {
    const userComment = document.createElement("div");
    userComment.classList.add("user-comment");

    const nameComment = document.createElement("h6");
    nameComment.classList.add("name-comment");
    nameComment.textContent = comentario.author; // Altere "author" para o campo correto no objeto de comentário

    const txtComment = document.createElement("p");
    txtComment.classList.add("comment");
    txtComment.textContent = comentario.texto; // Altere "text" para o campo correto no objeto de comentário

    const dateComment = document.createElement("p");
    dateComment.classList.add("time");
    dateComment.textContent = comentario.data; // Altere "date" para o campo correto no objeto de comentário

    userComment.append(nameComment, txtComment, dateComment);
    commentArea.appendChild(userComment);
    userComment.style.opacity = 100;
  });
}

function formatarData(dataString) {
  // Parse da data original
  const data = new Date(dataString);

  // Obtém os componentes da data e hora
  const dia = String(data.getDate()).padStart(2, "0"); // Dia com dois dígitos
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês com dois dígitos (lembrando que janeiro é 0)
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0"); // Hora com dois dígitos
  const minutos = String(data.getMinutes()).padStart(2, "0"); // Minutos com dois dígitos

  // Formata a data no formato desejado
  const dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

  return dataFormatada;
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
          localStorage.setItem("user", JSON.stringify(data));
          const loginBtn = document.getElementById("loginBtn");
          loginBtn.textContent = data.name;
          loginBtn.href = "/front/src/pages/profile/profile.html";

          fetch("http://localhost:3000/noticias/" + newsId)
            .then((resposta) => resposta.json())
            .then((noticia) => {
              noticia = noticia[0];
              renderizarDadosDaNoticia(noticia);
            })
            .catch((erro) => {
              console.error("Erro ao buscar detalhes da notícia:", erro);
            });
          fetch("http://localhost:3000/comments/" + newsId)
            .then((resposta) => resposta.json())
            .then((comentarios) => {
              renderizarComentarios(comentarios);
            })
            .catch((erro) => {
              console.log("Erro ao buscar comentários:", erro);
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
function publicComment() {
  const comment = document.getElementById("floatingTextarea").value;
  const data = formatarData(new Date());

  // Obtenha o usuário do localStorage e converta para objeto JSON
  const user = JSON.parse(localStorage.getItem("user"));
  const author = user.id; // Acesse o ID do usuário diretamente

  const commentData = {
    texto: comment,
    data: data,
    author: author,
    publicacao: newsId,
  };

  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  window.location.reload();
}

renderItensAuth();
postCommentBotao.addEventListener("click", publicComment);
