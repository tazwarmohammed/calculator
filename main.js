"use strict";

const display = document.querySelector('#display');

const operators = document.querySelectorAll('.op');

const allButtons = document.querySelectorAll('button');

let number1; 
let number2; 
let operator;
let operatorCount = 0;
let opActive = false;   //true if any operator is pressed
let equalTo = false;   //true if equal button is pressed


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
    if(num2 === 0) return 'Math Error';
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
    number1 = undefined
    number2 = undefined;
    operator, display.innerText = '';
    opActive, equalTo = false;
    operatorCount = 0;
}

//remove color of operators
function clearAllOperatorColor() {        
    operators.forEach((op) => {
        op.style.removeProperty("background-color");
    });
}

function disableButtons() {
    allButtons.forEach((button) => {
        if(!(button.innerText === 'ON')) {
            button.disabled = true;
        }
    });
}

function enableButtons() {
    allButtons.forEach((button) => {
        if(!(button.innerText === 'OFF')) {
            button.disabled = false;
        }
    });
}

//on-off button
document.querySelector('#display-on-off').addEventListener('click', (e) => {
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
allButtons.forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => {
        button.style.cssText = `background-color: white`;
        setTimeout(() => {
            button.style.removeProperty("background-color");
        }, 10);
        clearAllOperatorColor();
    });
});


//AC button
document.querySelector('#all-clear').addEventListener('click', allClear);


//number buttons
document.querySelectorAll('.num').forEach((number) => {
    number.addEventListener('click', (e) => {
        if(display.innerText.length<12) {
            if(opActive) {
                display.innerText = '';
                opActive = false;
            }
            display.innerText += e.target.innerText;
            equalTo = false;
        }
    });
});


//operator buttons
operators.forEach((op) => {
    op.addEventListener('click', (e) => {
        clearAllOperatorColor();
        opActive = true;
        setTimeout(() => {
            op.style.cssText = `background-color: white`;
        }, 50);
        // op.classList.add('clicked');
        if(operatorCount > 0) {
            number2 = Number(display.innerText);
            display.innerText = operate(number1, number2, operator);
        }  
        number1 = Number(display.innerText);
        operator = e.target.innerText;
        operatorCount++;
    })
});


//equal button
document.querySelector('#equal').addEventListener('click', () => {
    if(!equalTo) {
        operatorCount = 0;
        number2 = Number(display.innerText);
        display.innerText = operate(number1, number2, operator);
        opActive = true; 
        equalTo = true;
    }
});


//clear button
document.querySelector('#clear').addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});


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
document.querySelector('#decimal').addEventListener('click', () => {
    if(!display.innerText.includes('.')) {
        display.innerText += '.'
    }
});