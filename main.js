"use strict";

const display = document.querySelector('#display');

const operators = document.querySelectorAll('.op');

// const operators = ['+', '-', '×', '÷'];

let  number1, number2, operator;

let  operatorCount = 0;

let opActive = false;   //true if any operator or equal button is pressed


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
    number1, number2 = 0;
    operator, display.innerText = '';
    opActive = false;
    operatorCount = 0;
}

//check if result is infinity
function isInfinity() {
    
}

//all buttons
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 50);
        clearAllOperatorColor();
    });
});


//remove color of operators
function clearAllOperatorColor() {        
    operators.forEach((op) => {
        op.classList.remove('clicked');
    });
}


//AC button
document.querySelector('#all-clear').addEventListener('click', allClear);


//number buttons
document.querySelectorAll('.num').forEach((number) => {
    number.addEventListener('click', (e) => {
        if(display.innerText.length<24) {
            if(opActive) {
                display.innerText = '';
                opActive = false;
            }
            display.innerText += e.target.innerText;
        }
    });
});


//operator buttons
operators.forEach((op) => {
    op.addEventListener('click', (e) => {
        clearAllOperatorColor();
        opActive = true;
        setTimeout(() => {
            op.classList.add('clicked');
        }, 50);
        op.classList.add('clicked');
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
    operatorCount = 0;
    number2 = Number(display.innerText);
    display.innerText = operate(number1, number2, operator);
    opActive = true;
});


//clear button
document.querySelector('#clear').addEventListener('click', () => {
    
});