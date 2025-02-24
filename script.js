const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;
  const value = element.value;

  if (!element.matches("button")) return;

  switch (element.value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(element.value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "clear":
      clear();
      break;
    default:
      inputNumber(element.value);
  }
  updateDisplay();
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    
    if (typeof result === 'string') {
      displayValue = 'Hata';
    } else {
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstValue = result;
    }
  }

  waitingForSecondValue = true;
  operator = nextOperator;
  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
  try {
    switch(operator) {
      case '+': 
        return first + second;
      case '-': 
        return first - second;
      case '*': 
        return first * second;
      case '/': 
        if (second === 0) {
          throw new Error('Sıfıra bölünemez!');
        }
        return first / second;
      default: 
        return second;
    }
  } catch(error) {
    displayValue = 'Hata';
    setTimeout(() => {
      clear();
      updateDisplay();
    }, 1500);
    return error.message;
  }
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function clear() {
  displayValue = "0";
}
