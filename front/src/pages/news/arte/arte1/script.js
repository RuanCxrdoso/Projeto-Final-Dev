function createComment(comment) {

  const commentArea = document.getElementById('comments')
  const userComment = document.createElement('div')
  const nameComment = document.createElement('h6')
  const txtComment = document.createElement('p')
  const dateComment = document.createElement('p')

  const name = 'Ruan Cardoso' // Obter o nome do user no DB de alguma forma e atribuir à variável

  userComment.classList.add('user-comment')
  nameComment.classList.add('name-comment')
  txtComment.classList.add('comment')
  dateComment.classList.add('time')

  const data = new Date()
  const year = data.getFullYear()
  const month = data.getMonth()
  const day = data.getDate()
  const hour = data.getHours()
  const min = data.getMinutes()

  let fullDate = (`${day}/${month + 1}/${year} às ${hour}:${min}`)

  if (hour < 10) {
     fullDate = (`${day}/${month + 1}/${year} às 0${hour}:${min}`)
  } else if (min < 10) {
    fullDate = (`${day}/${month + 1}/${year} às ${hour}:0${min}`)
  } else if (hour < 10 && min < 10) {
    fullDate = (`${day}/${month + 1}/${year} às 0${hour}:0${min}`)
  }

  nameComment.innerText = name
  txtComment.innerText = comment
  dateComment.innerText = fullDate

  userComment.append(nameComment, txtComment, dateComment)
  commentArea.append(userComment)

    setTimeout(() => {
      userComment.style.opacity = '1';
      userComment.style.transform = 'translateY(0)';
  }, 50);
}

document.getElementById('comment-btn').addEventListener('click', (ev) => {
  ev.preventDefault()

  const txtComment = document.getElementById('floatingTextarea')
  createComment(txtComment.value)
  txtComment.value = ''
})

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar')
  const navLinks = Array.from(document.getElementsByClassName('nav-link'))
  const scroll = window.scrollY
  let screenWidth = window.innerWidth

  if (scroll > 10 && screenWidth > 992) {
    navbar.classList.add('scroll')
    navbar.style.height = '65px'
    navLinks.forEach((elem) => {
      elem.style.fontSize = '14px'
    })
  } else if (scroll < 10 && screenWidth > 992) {
    navbar.classList.remove('scroll')
    navbar.style.height = '99px'
    navLinks.forEach((elem) => {
      elem.style.fontSize = '16px'
    })
  } else if (screenWidth < 992) {
    navbar.style.height = 'auto'
  }

  const scrollBtn = document.getElementById('arrow-box')

  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1'
    scrollBtn.style.transform = 'translateX(0)'
  } else {
    scrollBtn.style.opacity = '0'
    scrollBtn.style.transform = 'translateX(4rem)'
  }
})

document.getElementById("arrow-box").addEventListener("click", function(e) {
  e.preventDefault();
  window.scrollBy(0, -3500)
});

window.sr = ScrollReveal({ reset : true })

ScrollReveal().reveal('.notice', {
  delay: 200,
  rotate: {
    x: 100
  }
})
