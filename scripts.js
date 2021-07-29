const content = document.querySelector('.main-content')
const elem = 'elem'
const empty = 'empty-elem'
const white = 'white-elem'
const black = 'black-elem'

let colorMove = 'white'
let moveListener = false

let confPrompt = prompt('cols and rows. 4-10')
let checkerPrompt = prompt('checker. 4 or 9 or 16')

console.log(confPrompt)
console.log(checkerPrompt)

let matrix = []
let Sqrt = Math.sqrt(checkerPrompt)
for (let i = 0; i < confPrompt; i++) {
  let row = []
  for (j = 0; j < confPrompt; j++) {
    if (j < Sqrt && i < Sqrt) {
      row[j] = 1
    } else if (j >= confPrompt - Sqrt && i >= confPrompt - Sqrt) {
      row[j] = 2
    } else {
      row[j] = 0
    }
  }
  matrix.push(row)
}

console.log(matrix)

let qwe = `${100 * confPrompt + 5 * confPrompt}`
const mainCont = document.querySelector('.main-content')
mainCont.style.width = `${qwe}px`

mainCont.style.hight = mainCont.style.width

const moveColor = document.querySelector('.move-color')
moveColor.textContent = 'white'
function draw() {
  content.innerHTML = ''
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.setAttribute('id', `${i}${j}`)
      if (matrix[i][j] === 1) {
        cell.classList.add(white)
      }
      if (matrix[i][j] === 2) {
        cell.classList.add(black)
      }
      let massBlack = []
      let massWhite = []
      for (let i = 0; i < Sqrt; i++) {
        for (let j = 0; j < Sqrt; j++) {
          if (matrix[i][j] === 2) {
            massBlack.push(0)
          }
        }
      }
      for (let i = confPrompt - Sqrt; i < confPrompt; i++) {
        for (let j = confPrompt - Sqrt; j < confPrompt; j++) {
          if (matrix[i][j] === 1) {
            massWhite.push(1)
          }
        }
      }

      console.log(massBlack.length)
      console.log(checkerPrompt)
      if (     
        +massBlack.length === +checkerPrompt
      ) {
        moveColor.textContent = 'Black wins!'
        return
      } else if (
        +massWhite.length === +checkerPrompt
      ) {
        moveColor.textContent = 'White wins!'
        return
      }

      cell.addEventListener('click', move)

      content.appendChild(cell)
    }
  }
}
draw()
function move(event) {
  let targID = event.target.id
  let targ = document.getElementById(targID)
  let massID = [...targID]

  if (targ.classList.contains('empty-active-elem')) {
    const activeElem = document.querySelector('.active-elem')
    if (activeElem.classList.contains('black-elem')) {
      matrix[massID[0]][massID[1]] = 2
    } else {
      matrix[massID[0]][massID[1]] = 1
    }
    let activeIdArr = [...activeElem.id]
    matrix[activeIdArr[0]][activeIdArr[1]] = 0

    moveListener = true
    if (moveColor.textContent === 'white') {
      moveColor.textContent = 'black'
    } else {
      moveColor.textContent = 'white'
    }
    draw()
    return
  }

  if (moveListener === true) {
    if (colorMove === 'white') {
      colorMove = 'black'
    } else if (colorMove === 'black') {
      colorMove = 'white'
    }
  }

  const activeElem = document.querySelectorAll('.active-elem')
  if (activeElem.length > 0) {
    draw()
  } else {
    if (
      (matrix[massID[0]][massID[1]] === 1 ||
        matrix[massID[0]][massID[1]] === 2) &&
      targ.classList.contains(`${colorMove}-elem`)
    ) {
      targ.classList.add('active-elem')
      if (
        massID[1] != confPrompt - 1 &&
        matrix[massID[0]][+massID[1] + 1] != 1 &&
        matrix[massID[0]][+massID[1] + 1] != 2
      ) {
        let emptyElem = document.getElementById(`${massID[0]}${+massID[1] + 1}`)
        emptyElem.classList.add('empty-active-elem')
      }
      if (
        massID[1] != 0 &&
        matrix[massID[0]][+massID[1] - 1] != 1 &&
        matrix[massID[0]][+massID[1] - 1] != 2
      ) {
        let emptyElem = document.getElementById(`${massID[0]}${+massID[1] - 1}`)
        emptyElem.classList.add('empty-active-elem')
      }
      if (
        massID[0] != confPrompt - 1 &&
        matrix[+massID[0] + 1][massID[1]] != 1 &&
        matrix[+massID[0] + 1][massID[1]] != 2
      ) {
        let emptyElem = document.getElementById(`${+massID[0] + 1}${massID[1]}`)
        emptyElem.classList.add('empty-active-elem')
      }
      if (
        massID[0] != 0 &&
        matrix[+massID[0] - 1][massID[1]] !== 1 &&
        matrix[+massID[0] - 1][massID[1]] !== 2
      ) {
        let emptyElem = document.getElementById(`${+massID[0] - 1}${massID[1]}`)
        emptyElem.classList.add('empty-active-elem')
      }
    }
  }
  moveListener = false
}
