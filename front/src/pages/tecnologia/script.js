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

  if (window.scrollY > 500) {
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

ScrollReveal().reveal('.card', {
  delay: 200,
  rotate: {
    x: 100
  }
})