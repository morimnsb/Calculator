
const calculator ={
  displayValue:"0",
  firstOperand: null,
  waitingForSecondOperand:false,
  operator:null,
};

const UpdateDisplay = () =>{
  const display = document.querySelector(`.screen`)
  display.value = calculator.displayValue
}

UpdateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click',(event) => {
      
  const {target} = event;        
  if (!target.matches('button')){
    return;
  }
  
  if (target.classList.contains('operator')) {
    handelOperator(target.value)
    UpdateDisplay();
    return;
  }
  if (target.classList.contains('decimal')){
    inputDecimal(target.value)
    UpdateDisplay();
    return;
  }
  if (target.classList.contains('all-clear')){
     resetCalculator();
     UpdateDisplay();
     return;
  }
  if (target.classList.contains('negative')){
    inputNegative(target.value)
    UpdateDisplay();
    return;
 }

  inputDigit(target.value);
  UpdateDisplay();
}
);

const inputDigit = (digit) => {
  const {displayValue, waitingForSecondOperand}=calculator;
  if (waitingForSecondOperand ===true) {
    calculator.displayValue=digit;
    calculator.waitingForSecondOperand = false;
  }else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

};
const inputNegative = (dot) => {
  if (calculator.waitingForSecondOperand === true){
    calculator.displayValue = dot;
    calculator.waitingForSecondOperand=false;
    return;
    }
  if (calculator.displayValue == 0){
    
      calculator.displayValue = "";
      calculator.displayValue = dot +=calculator.displayValue;
  }else if (calculator.displayValue > 0) {
      calculator.displayValue = -calculator.displayValue
      
    } else {
      calculator.displayValue = Math.abs(calculator.displayValue);
    }
  
};
  

const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true){
  calculator.displayValue = "0.";
  calculator.waitingForSecondOperand=false;
  return;
  }
  if (!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }

};


const handelOperator = (nextOperator) => {
  const {firstOperand,displayValue,operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand){
    calculator.operator = nextOperator;
    return
  }
  if (firstOperand == null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;

  }else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;

  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};

const calculate = (firstOperand, secondOperand, operator,secondOperator) => {
  if (operator === '+') {
    return firstOperand + secondOperand;
  }else if (operator === '-') {
    return firstOperand - secondOperand;
  }else if (operator === '*'){
    return firstOperand * secondOperand;
  }else if (operator === '/'){
    return firstOperand / secondOperand;
  }
  else if (operator === '%'){
    return firstOperand / 100 * secondOperand  ;
  }
  return secondOperand;
  }

  const resetCalculator = () => {
    calculator.displayValue="0";
    calculator.firstOperand= null;
    calculator.waitingForSecondOperand=false;
    calculator.operator=null;
  };
