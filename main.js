"use strict";

const display = document.querySelector('#display');

const operatorDom = document.querySelectorAll('.op');

const allButtonDom = document.querySelectorAll('button');

const domIds = {
    '+': 'add',
    '-' : 'subtract',
    '*' : 'multiply',
    '/' : 'divide',
    'Backspace' : 'clear',
    '.' : 'decimal',
    'Enter' : 'equal',
    '0' : 'zero',
    '1' : 'one',
    '2' : 'two',
    '3' : 'three',
    '4' : 'four',
    '5' : 'five',
    '6' : 'six',
    '7' : 'seven',
    '8' : 'eight',
    '9' : 'nine'
};

let number1; 
let number2; 
let operator;
let operatorCount = 0;
let isOperator = false;   //true if any operator is pressed
let isEqual = false;   //true if equal button is pressed


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    if(operator == '+') {
        return add(num1, num2);
    } else if(operator == '-') {
        return subtract(num1, num2);
    } else if(operator == '×') {
        return multiply(num1, num2);
    } else if(operator == '÷') {
        return divide(num1, num2);
    }
}

//remove everything from display
function allClear() {                
    number1 = undefined;
    number2 = undefined;
    operator = undefined;
    display.innerText = '';
    isOperator = false;
    isEqual = false;
    operatorCount = 0;
}

//remove color of operators
function clearAllOperatorColor() {        
    operatorDom.forEach((op) => {
        op.style.removeProperty("background-color");
    });
}

function displayResult() {
    number2 = Number(display.innerText);
    let result = operate(number1, number2, operator);
    if(result === Infinity) {
        display.innerText = 'Math Error';
    } else {
        result = operate(number1, number2, operator);
        display.innerText = result;
    }
}

function resultLength(e, length, isClick) {
    if(display.innerText.length <= length) {
        if(isClick) {
            display.innerText += e.target.innerText;
        } else {
            display.innerText += e.key;
        }
        isEqual = false;
    }
}

function disableButtons() {
    allButtonDom.forEach((button) => {
        if(!(button.innerText === 'ON')) {
            button.disabled = true;
        }
    });
}

function enableButtons() {
    allButtonDom.forEach((button) => {
        if(!(button.innerText === 'OFF')) {
            button.disabled = false;
        }
    });
}

function buttonAction(e, isClick) {
    let currentButton;
    if(isClick) {
        currentButton = e.target;
        currentButton.style.cssText = `background-color: white`;
        setTimeout(() => {
            currentButton.style.removeProperty("background-color");
        }, 10);
    } else {
        currentButton = document.getElementById(domIds[e.key]);
        currentButton.style.cssText = `background-color: white`;
        setTimeout(() => {
            currentButton.style.removeProperty("background-color");
        }, 10);
    }
    clearAllOperatorColor();
}

function numberInput(e, isClick) {
    if(isOperator) {
        display.innerText = '';
        isOperator = false;
    }

    resultLength(e, 12, isClick);
}

function operatorInput(e, isClick) {
    if(display.innerText !== '') {
        isOperator = true;
        if(operatorCount > 0) {
            displayResult();
        }
        number1 = Number(display.innerText);
        display.innerText = '';
        if(isClick) {
            operator = e.target.innerText;
            setTimeout(() => {
                e.target.style.cssText = `background-color: white`;
            }, 10);
        } else {
            const operatorDom = document.getElementById(domIds[e.key])
            operator = operatorDom.innerText;
            setTimeout(() => {
                operatorDom.style.cssText = `background-color: white`;
            }, 10);
        }
        operatorCount++;
    }
}

function equalAction() {
    if(!isEqual && display.innerText !== '') {
        operatorCount = 0;
        displayResult();
        isOperator = true;
        isEqual = true;
    }
}

function clearAction() {
    if(!(display.textContent === 'Math Error' || display.textContent === 'NaN')) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function decimalInput() {
    if(!display.innerText.includes('.')) {
        display.innerText += '.';
    }
}


//on-off button
document.querySelector('#on-off').addEventListener('click', (e) => {
    if(e.target.innerText === 'OFF') {
        allClear();
        e.target.innerText = 'ON';
        display.innerText = 'Calculator off!';
        disableButtons();
    } else {
        e.target.innerText = 'OFF';
        display.innerText = '';
        enableButtons();
    }
});


//all buttons
allButtonDom.forEach((button) => {
    button.addEventListener('click', (e) => {
        buttonAction(e, true);
    });
});


//AC button
document.querySelector('#all-clear').addEventListener('click', allClear);


//number buttons
document.querySelectorAll('.num').forEach((number) => {
    number.addEventListener('click', (e) => {
        numberInput(e, true);
    });
});


//operator buttons
operatorDom.forEach((op) => {
    op.addEventListener('click', (e) => {
        operatorInput(e, true);
    });
});


//equal button
document.querySelector('#equal').addEventListener('click', equalAction);


//clear button
document.querySelector('#clear').addEventListener('click', clearAction);


//plus-minus button
document.querySelector('#plus-minus').addEventListener('click', () => {
    if(Number(display.innerText) === 0) {
        return;
    } else if(Number(display.innerText) > 0) {
        display.innerText = '-' + display.innerText;
    } else if(Number(display.innerText) < 0) {
        display.innerText = display.innerText.slice(1);
    }
});


//dot(decimal) button
document.querySelector('#decimal').addEventListener('click', decimalInput);


//keyboard support
document.addEventListener(('keydown'), (e) => {
    // console.log(e.key);

    if(e.key in domIds) {
        buttonAction(e, false);
    }

    if(e.key === '.') {
        decimalInput();
    } else if(e.key>=0 && e.key<=9) {
        numberInput(e, false);
    } else if(e.key === 'Enter') {
        equalAction();
    } else if(e.key === 'Backspace') {
        clearAction();
    } else if(e.key in domIds) {
        operatorInput(e, false);
    }
});