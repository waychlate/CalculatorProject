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
const specialOperators = "=c+/-←";

let firstNum = [];
let secondNum = [];
let operator = '';
let sum = 0;

function eval (first, second, opp) {
    result = parseFloat(operate(parseFloat(firstNum.join('')), parseFloat(secondNum.join('')), operator).toFixed(12));
    
    firstNum = [];
    for (let v of result.toString().split('')) {
        firstNum.push(v)
    }
    
    secondNum = [];
    display.textContent = firstNum.join('');

    if (result == 'Infinity') {
        display.textContent = 'bruh';
        firstNum = [];
        secondNum = [];
        operator = '';
        result = 0;
    }
}

contentContainer.addEventListener("click", (event) => {
    let char = event.target.textContent;

    if (event.target.nodeName == "BUTTON") {
        if (firstNum.length == 0 && possibleOperators.includes(char)) return; 

        if (firstNum.length != 0  && secondNum.length == 0 && possibleOperators.includes(char)) {
            if (char == operator) {
                secondNum = firstNum;
                eval(firstNum, secondNum, operator);
                return;
            }
        }

        if (firstNum.length != 0 && possibleOperators.includes(char)) {
            if (firstNum.length != 0 && secondNum.length != 0 && operator) {
                eval(firstNum, secondNum, operator);
                operator = char;
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
                case '+/-':
                    if (display.textContent == firstNum.join('') && !firstNum.includes('-')) {
                        firstNum.unshift('-');
                        display.textContent = firstNum.join('');
                    } else if (display.textContent == firstNum.join('') && firstNum.includes('-')) {
                        firstNum.shift();
                        display.textContent = firstNum.join('');
                    }
                    if (display.textContent == secondNum.join('') && !secondNum.includes('-')) {
                        secondNum.unshift('-');
                        display.textContent = secondNum.join('');
                    } else if (display.textContent == secondNum.join('') && secondNum.includes('-')) {
                        secondNum.shift();
                        display.textContent = secondNum.join('');
                    }
                    return;
                case '←':
                    if (display.textContent == firstNum.join('')) {
                        firstNum.shift();
                        if (firstNum.length == 0) firstNum.push('0');
                        display.textContent = firstNum.join('');
                    } 
                    if (display.textContent == secondNum.join('')) {
                        secondNum.shift();
                        if (secondNum.length == 0) firstNum.push('0');
                        display.textContent = secondNum.join('');
                    }

            }
        }

        //Get a firstNum value
        if (!operator && !possibleOperators.includes(char) && !specialOperators.includes(char)) {
            if (!firstNum.includes('.') && char == '.') {
                firstNum.push(char);
                display.textContent = firstNum.join('');
                return;
            } else if (firstNum.includes('.') && char == '.'){
                return;
            } else {
                firstNum.push(char);
                display.textContent = firstNum.join('');
                return;
            }
        }

        //Get a secondNum value
        if (operator && !possibleOperators.includes(char) && !specialOperators.includes(char)) {
            if (!secondNum.includes('.') && char == '.') {
                secondNum.push(char);
                display.textContent = secondNum.join('');
                return;
            } else if (secondNum.includes('.') && char == '.'){
                return;
            } else {
                secondNum.push(char);
                display.textContent = secondNum.join('');
                return;
            }
        }

    }
})

document.addEventListener("keydown", event => {
    const availableInputs = '1234567890.'

    if (availableInputs.includes(event.key)) {
        event.preventDefault();
        let char = event.key;

        //Get a firstNum value
        if (!operator && !possibleOperators.includes(char) && !specialOperators.includes(char)) {
            if (!firstNum.includes('.') && char == '.') {
                firstNum.push(char);
                display.textContent = firstNum.join('');
                return;
            } else if (firstNum.includes('.') && char == '.'){
                return;
            } else {
                firstNum.push(char);
                display.textContent = firstNum.join('');
                return;
            }
        }

        //Get a secondNum value
        if (operator && !possibleOperators.includes(char) && !specialOperators.includes(char)) {
            if (!secondNum.includes('.') && char == '.') {
                secondNum.push(char);
                display.textContent = secondNum.join('');
                return;
            } else if (secondNum.includes('.') && char == '.'){
                return;
            } else {
                secondNum.push(char);
                display.textContent = secondNum.join('');
                return;
            }
        }
    }
})