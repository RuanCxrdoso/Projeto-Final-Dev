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
})