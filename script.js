const screen = document.querySelector(".screen")
const calculation = document.createElement('p');
calculation.classList.add("calculation");
screen.appendChild(calculation);

// functionality
let currentInput = '0';
let prevInput = '';
let operation = null;
let resetScreen = false;
let expression = '';
function expressionString(){
  if (operation) {
    expression = `${prevInput} ${operation} ${currentInput}`;
  }
}
  
function updateScreen(){
  calculation.textContent = expression || currentInput;
}

// user input, displays the entered number
function userInput(num){
  if (currentInput === '0' || resetScreen){
    currentInput = num;
    resetScreen = false;
  }
  else {
    currentInput += num;
  }

  expressionString();
}

// decimal handling
function decimal(){
  if(resetScreen){
    currentInput = '0.';
    resetScreen = false;
    return;
  }
  if (!currentInput.includes('.')){
    currentInput += '.';
  }

  expressionString();
}

// operations 
function setOperation(operator){
  if(currentInput === '0') return;

  if(prevInput !== ''){
    calculate();
  }
  operation = operator;
  prevInput = currentInput;
  expression =  `${prevInput} ${operation}`;
  resetScreen = true;
}

function calculate(){
  let result;
  const prev = parseFloat(prevInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  prevInput = '';
  expression = '';
  operation = null;
}

// reset screen
function reset(){
  currentInput = '0';
  prevInput = '';
  operation = null;
  expression = '';
}

// backspace function
function useBackspace(){
  if (currentInput.length === 1) {
    currentInput = '0';
  }
  else {
    currentInput = currentInput.slice(0,-1);
  }

  expressionString();
}

const keys = document.querySelectorAll('button');
keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    const keyValue = e.target.textContent;

    if(keyValue === '0' || !isNaN(keyValue)) {
      userInput(keyValue);
    }
    if (keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/'){
      setOperation(keyValue);
    }
    else if(keyValue === '.'){
      decimal();
    }
    else if(keyValue === 'Ac'){
      reset();
    }
    else if (keyValue === '⌫'){
      useBackspace();
    }
    else if (keyValue === '=') {
      calculate();
    }

    updateScreen();
  });
});

updateScreen();
