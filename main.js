const display = document.querySelector('#display');

// const operators = ['+', '-', '×', '÷'];

let number1, number2, operator;

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

function allClear() {
    display.innerText = '';
}

document.querySelector('#all-clear').addEventListener('click', allClear);

document.querySelectorAll('.num').forEach((number) => {
    number.addEventListener('click', (e) => {
        if(display.innerText.length<18) {
            display.innerText += e.target.innerText;
        }
    });
});

document.querySelectorAll('.op').forEach((op) => {
    op.addEventListener('click', (e) => {
        number1 = Number(display.innerText);
        operator = e.target.innerText;
        allClear();
    })
});


document.querySelector('#equal').addEventListener('click', (e) => {
    number2 = Number(display.innerText);
    display.innerText = operate(number1, number2, operator);
});

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.style.cssText = `background-color: rgb(247, 142, 224);`;
        setTimeout(function() {
            e.target.style.backgroundColor = "rgb(236, 203, 229)";
        }, 50);
    });
});