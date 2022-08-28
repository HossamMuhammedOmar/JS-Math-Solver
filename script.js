const inputElement = document.querySelector('#equation')
const solveBtn = document.querySelector('button')
const resultsElement = document.getElementById('results')

let collectors = []
let result = 0

solveBtn.addEventListener('click', e => {
  e.preventDefault()
  if (inputElement.value.length != 0) convertInputToArray(inputElement.value)
  inputElement.value = ''
  resultsElement.style.display = 'block'
  collectors = []
})

function convertInputToArray(input) {
  resultsElement.innerHTML = ''
  const arr = input.split(' ')
  arr.forEach(n => {
    collectors.push(n)
  })
  nextStep()
}

function calculate(num1, operator, num2) {
  if (operator === '*') return num1 * num2
  if (operator === '/') return num1 / num2
  if (operator === '+') return num1 + num2
  if (operator === '-') return num1 - num2
}

function nextStep() {
  resultsElement.innerHTML += `<div class='math'> ${collectors
    .join(' ')
    .toString()}</div> <br/>`
  while (collectors.length > 1) {
    const multiplyIndex = collectors.findIndex(operator => operator === '*')
    const divisionIndex = collectors.findIndex(operator => operator === '/')

    if (multiplyIndex != -1) {
      updateArr(multiplyIndex)
      resultsElement.innerHTML += `<div class='multiply-div'><span class='multiply'>${collectors
        .join(' ')
        .toString()}</span> <span class='multiply-txt'> ⇦ multiply result</span></div> <br/>`
    } else if (divisionIndex != -1) {
      updateArr(divisionIndex)
      resultsElement.innerHTML += `<div class='division-div'><span class='division'>${collectors
        .join(' ')
        .toString()}</span> <span class='division-txt'> ⇦ division result</span></div> <br/>`
    } else {
      updateArr(1)
      if (collectors.length !== 1) {
        resultsElement.innerHTML += `<div class='sum-div'><span class='sum'>${collectors
          .join(' ')
          .toString()}</span> <span class='sum-txt'> ⇦ add and subtract result</span></div> <br/>`
      } else {
        resultsElement.innerHTML += `<div class='total-div'><span class='total'>${collectors
          .join(' ')
          .toString()}</span> <span class='total-txt'> ⇦ total result</span></div> <br/>`
      }
    }
  }
}
function updateArr(index) {
  const [num1, operator, num2] = collectors.splice(index - 1, 3)
  collectors.splice(
    index - 1,
    0,
    calculate(Number(num1), operator, Number(num2))
  )
  result = calculate(Number(num1), operator, Number(num2))
}






// 2 + 4 * 3 - 7 * 5 - 10 / 5 + 10 - 50 * 2 / 50 + 700 * 5200
