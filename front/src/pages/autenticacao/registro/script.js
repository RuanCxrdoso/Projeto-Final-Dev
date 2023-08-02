const form = document.getElementById('registerForm')
const password = document.getElementById('password')
const passwordtwo = document.getElementById('passwordtwo')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()

  const senha1 = password.value
  const senha2 = passwordtwo.value

  if (senha1 !== senha2) {

    lancaErro(password, 'As senhas devem ser iguais !', 'small')
    lancaErro(passwordtwo, 'As senhas devem ser iguais !', 'small2')

  } else if (senha1 === senha2) {

    const formularioDados = new FormData(ev.target)

    const name = formularioDados.get('name')
    const email = formularioDados.get('email')
    const senha = formularioDados.get('password')

    const dados = {
      name: name,
      email: email,
      senha: senha,
      admin: false
    }

    fetch('https://localhost:3000/registro', { // aqui vai o caminho do back (?)
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
      .then((resposta) => resposta.json())
      .then((dados) => {

        console.log(dados);
      })
      .catch((erro) => {

        console.error("Erro:", erro);
      });

    removeErro(password, 'small')
    removeErro(passwordtwo, 'small2')
    form.reset()
  }
})

function lancaErro(input, message, id) {

  const small = document.getElementById(id)

  input.className = 'form-control erro'
  small.innerText = message
}

function removeErro(input, id) {

  const small = document.getElementById(id)

  input.className = 'form-control'
  small.innerHTML = ''
}