const previousOperandElement = document.querySelector('.previous_operend');
const currentOperandElement = document.querySelector('.current_operend');
const equalButton = document.querySelector('.equal_btn');
const acButton = document.querySelector('#ac');
const delButton = document.querySelector('#del');
const operatorButton = document.querySelectorAll('.operator');
const numbersButton = document.querySelectorAll('.numbers');

let previousOperand = '';
let currentOperand = '';
let operators = '';

function formattingNumber(num) {
  return Number(num).toLocaleString('en');
}

function updateDisplay() {
  currentOperandElement.innerHTML = formattingNumber(currentOperand);
  previousOperandElement.innerHTML = `${formattingNumber(
    previousOperand
  )} ${operators}`;
}

function appendNumber(number) {
  currentOperand += number;
}

function chooseOperator(item) {
  if (previousOperand) {
    previousOperand = totalCalculation();
  } else {
    previousOperand = currentOperand;
  }
  operators = item;
  currentOperand = '';
}

function totalCalculation() {
  switch (operators) {
    case '÷':
      return Number(previousOperand) / Number(currentOperand);
    case '*':
      return Number(previousOperand) * Number(currentOperand);
    case '+':
      return Number(previousOperand) + Number(currentOperand);
    case '-':
      return Number(previousOperand) - Number(currentOperand);
    case '%':
      return Number(previousOperand) % Number(currentOperand);
  }
}

// Operator Button
operatorButton.forEach(btn => {
  btn.addEventListener('click', function () {
    if (!currentOperand) return;
    chooseOperator(btn.textContent);
    updateDisplay();
  });
});

// Equal Button
equalButton.addEventListener('click', function () {
  if (!previousOperand) return;
  if (currentOperand) {
    currentOperand = totalCalculation();
  } else {
    currentOperand = previousOperand;
  }
  previousOperand = '';
  operators = '';
  updateDisplay();
});

// Clear All Button
acButton.addEventListener('click', function () {
  previousOperand = '';
  currentOperand = '';
  operators = '';
  updateDisplay();
});

// Del Button
delButton.addEventListener('click', function () {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
});

// ALL Number Button
numbersButton.forEach(btn => {
  btn.addEventListener('click', function () {
    if (btn.textContent === '.' && currentOperand.includes('.')) return;
    else if (btn.textContent === '.' && currentOperand === '') return;
    else {
      appendNumber(btn.textContent);
      updateDisplay();
    }
  });
});
