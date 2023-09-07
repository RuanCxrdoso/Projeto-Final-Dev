export default function validation(token) {
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
