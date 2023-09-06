const form = document.getElementById("registerForm");

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const senha1 = password.value;
  const senha2 = passwordtwo.value;

  if (senha1 !== senha2) {
    lancaErro(password, "As senhas devem ser iguais!", "passwordError");
    return;
  }

  const name = form.name.value;
  const email = form.email.value;
  const senha = form.password.value;

  const dados = {
    name,
    email,
    password: senha, // Certifique-se de usar o nome correto do campo
    admin: false,
  };

  try {
    const resposta = await fetch("https://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao registrar usuário: ${resposta.status}`);
    }

    const resultado = await resposta.json();
    console.log(resultado);

    removeErro(password, "passwordError");
    form.reset();
  } catch (erro) {
    console.error("Erro:", erro);
  }
});

function lancaErro(input, message, id) {
  const small = document.getElementById(id);

  input.classList.add("erro");
  small.textContent = message;
}

function removeErro(input, id) {
  const small = document.getElementById(id);

  input.classList.remove("erro");
  small.textContent = "";
}
