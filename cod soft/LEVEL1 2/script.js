document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;

    function updateDisplay() {
        display.innerText = displayValue;
    }

    updateDisplay();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { id } = button;
            
            if (button.classList.contains('number')) {
                handleNumber(id);
            } else if (button.classList.contains('operator'))
                 {
                handleOperator(id);
            } 
            else if (id === 'clear') 
                {
                handleClear();
            } 
            else if (id === 'equals')
                 {
                handleEquals();
            }

            updateDisplay();
        });
    });

    function handleNumber(id) {
        const number = id.replace('one', '1').replace('two', '2').replace('three', '3').replace('four', '4')
                        .replace('five', '5').replace('six', '6').replace('seven', '7').replace('eight', '8')
                        .replace('nine', '9').replace('zero', '0');

        if (waitingForSecondOperand) {
            displayValue = number;
            waitingForSecondOperand = false;
        } else {
            displayValue = displayValue === '0' ? number : displayValue + number;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            displayValue = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    const performCalculation = {
        'add': (firstOperand, secondOperand) => firstOperand + secondOperand,
        'subtract': (firstOperand, secondOperand) => firstOperand - secondOperand,
        'multiply': (firstOperand, secondOperand) => firstOperand * secondOperand,
        'divide': (firstOperand, secondOperand) => firstOperand / secondOperand,
    };

    function handleClear() {
        displayValue = '0';
        firstOperand = null;
        waitingForSecondOperand = false;
        operator = null;
    }

    function handleEquals() {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondOperand) {
            operator = null;
            return;
        }

        if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            displayValue = String(result);
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        }
    }
});
