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
