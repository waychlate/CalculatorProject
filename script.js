let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function operate (firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '×':
            return multiply(firstNum, secondNum);
        case '÷':
            return divide(firstNum, secondNum);
        default:
            return '';
    }
}

const contentContainer = document.querySelector(".calculator-container");
const display = document.querySelector(".display-container p");

const possibleOperators = "-+÷×";
const specialOperators = "=c";

let firstNum = [];
let secondNum = [];
let operator = '';
let sum = 0;

function eval (first, second, opp) {
    sum = operate(parseInt(firstNum.join('')), parseInt(secondNum.join('')), operator);
    console.log(sum)
    
    firstNum = [];
    firstNum.push(sum);
    secondNum = [];
    display.textContent = firstNum.join('');
}

contentContainer.addEventListener("click", (event) => {
    let char = event.target.textContent;

    if (event.target.nodeName == "BUTTON") {
        //In the future integrate the negative sign 
        if (firstNum.length == 0 && possibleOperators.includes(char)) return; 

        if (firstNum.length != 0  && possibleOperators.includes(char)) {
            if (firstNum.length != 0 && secondNum.length != 0 && operator) {
                eval(firstNum, secondNum, operator);
            } else {
                operator = char;
            }
        }

        if (specialOperators.includes(char)) {
            switch(char) {
                case '=':
                    if (firstNum.length != 0 && secondNum.length != 0 && operator) eval(firstNum, secondNum, operator);
                    return;
                case 'c':
                    firstNum = [];
                    secondNum = [];
                    operator = '';
                    sum = 0;
                    display.textContent = '0';
                    return;
            }
        }

        //Get a firstNum value
        if (!operator && !possibleOperators.includes(char) && !specialOperators.includes(char)) {
            firstNum.push(char);
            display.textContent = firstNum.join('');
            return;
        }

        //Get a secondNum value
        if (operator && !possibleOperators.includes(char) && !specialOperators.includes(char)) {
            secondNum.push(char);
            display.textContent = secondNum.join('');
            return;
        }
    }
})

