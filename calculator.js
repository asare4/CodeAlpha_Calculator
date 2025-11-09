const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if(button.classList.contains('number') || button.classList.contains('dot')){
      currentInput += value;
      display.value = currentInput;
    } 
    else if(button.classList.contains('operator')){
      if(currentInput === '' && previousInput !== '') {
        operator = value; // allow changing operator before new input
      } else {
        if(previousInput !== ''){
          calculate();
        } else {
          previousInput = currentInput;
        }
        operator = value;
        currentInput = '';
      }
    }
    else if(button.classList.contains('equal')){
      calculate();
    }
    else if(button.classList.contains('clear')){
      currentInput = '';
      previousInput = '';
      operator = '';
      display.value = '';
    }
  });
});

function calculate(){
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if(isNaN(prev) || isNaN(curr)) return;

  switch(operator){
    case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/': result = prev / curr; break;
    default: return;
  }

  display.value = result;
  previousInput = result;
  currentInput = '';
  operator = '';
}
