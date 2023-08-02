export default function validation() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/front/src/pages/autenticacao/login/login.html";
    return;
  }
}

const other = () => {
  fetch("http://localhost:3000/noticias", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resposta) => resposta.json())
    .then((dados) => {
      // Lidar com os dados da resposta
      console.log(dados);
    })
    .catch((erro) => {
      console.error("Erro ao obter as notícias protegidas:", erro);
    });
};
