// Scientific Calculator for Windows 12 Web OS
class Calculator {
    constructor(windowElement) {
        this.windowElement = windowElement;
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.scientificMode = false;
        this.init();
    }

    init() {
        this.setupUI();
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupUI() {
        this.display = document.createElement('div');
        this.display.className = 'calculator-display';
        
        this.buttons = document.createElement('div');
        this.buttons.className = 'calculator-buttons';
        this.buttons.innerHTML = `
            <div class="basic-buttons">
                <button class="clear">C</button>
                <button class="backspace">⌫</button>
                <button class="percentage">%</button>
                <button class="divide">/</button>
                
                <button class="seven">7</button>
                <button class="eight">8</button>
                <button class="nine">9</button>
                <button class="multiply">*</button>
                
                <button class="four">4</button>
                <button class="five">5</button>
                <button class="six">6</button>
                <button class="subtract">-</button>
                
                <button class="one">1</button>
                <button class="two">2</button>
                <button class="three">3</button>
                <button class="add">+</button>
                
                <button class="zero">0</button>
                <button class="decimal">.</button>
                <button class="equals">=</button>
            </div>
            <div class="scientific-buttons" style="display:none">
                <button class="sin">sin</button>
                <button class="cos">cos</button>
                <button class="tan">tan</button>
                <button class="log">log</button>
                <button class="ln">ln</button>
                <button class="pi">π</button>
                <button class="power">x^y</button>
                <button class="sqrt">√</button>
                <button class="factorial">x!</button>
            </div>
            <button class="mode-toggle">Scientific Mode</button>
        `;

        const content = this.windowElement.querySelector('.window-content');
        content.innerHTML = '';
        content.appendChild(this.display);
        content.appendChild(this.buttons);
    }

    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('.calculator-buttons button').forEach(button => {
            if (button.className.match(/zero|one|two|three|four|five|six|seven|eight|nine/)) {
                button.addEventListener('click', () => this.appendNumber(button.textContent));
            }
        });

        // Operation buttons
        document.querySelector('.add').addEventListener('click', () => this.setOperation('+'));
        document.querySelector('.subtract').addEventListener('click', () => this.setOperation('-'));
        document.querySelector('.multiply').addEventListener('click', () => this.setOperation('*'));
        document.querySelector('.divide').addEventListener('click', () => this.setOperation('/'));

        // Other buttons
        document.querySelector('.clear').addEventListener('click', () => this.clear());
        document.querySelector('.equals').addEventListener('click', () => this.compute());
        document.querySelector('.decimal').addEventListener('click', () => this.appendDecimal());
        document.querySelector('.backspace').addEventListener('click', () => this.backspace());
        document.querySelector('.percentage').addEventListener('click', () => this.percentage());
        document.querySelector('.mode-toggle').addEventListener('click', () => this.toggleMode());

        // Scientific buttons
        document.querySelector('.sin').addEventListener('click', () => this.scientificFunction('sin'));
        document.querySelector('.cos').addEventListener('click', () => this.scientificFunction('cos'));
        document.querySelector('.tan').addEventListener('click', () => this.scientificFunction('tan'));
        document.querySelector('.log').addEventListener('click', () => this.scientificFunction('log'));
        document.querySelector('.ln').addEventListener('click', () => this.scientificFunction('ln'));
        document.querySelector('.pi').addEventListener('click', () => this.appendNumber(Math.PI.toString()));
        document.querySelector('.power').addEventListener('click', () => this.setOperation('^'));
        document.querySelector('.sqrt').addEventListener('click', () => this.scientificFunction('sqrt'));
        document.querySelector('.factorial').addEventListener('click', () => this.scientificFunction('factorial'));
    }

    appendNumber(number) {
        if (this.currentInput === '0' && number !== '.') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
            this.updateDisplay();
        }
    }

    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        if (this.currentInput === '') this.currentInput = '0';
        this.updateDisplay();
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.updateDisplay();
    }

    setOperation(operation) {
        if (this.currentInput === '0') return;
        if (this.previousInput !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousInput = this.currentInput;
        this.currentInput = '0';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentInput = computation.toString();
        this.operation = null;
        this.previousInput = '';
        this.updateDisplay();
    }

    percentage() {
        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
        this.updateDisplay();
    }

    scientificFunction(func) {
        const input = parseFloat(this.currentInput);
        let result;
        
        switch (func) {
            case 'sin':
                result = Math.sin(input);
                break;
            case 'cos':
                result = Math.cos(input);
                break;
            case 'tan':
                result = Math.tan(input);
                break;
            case 'log':
                result = Math.log10(input);
                break;
            case 'ln':
                result = Math.log(input);
                break;
            case 'sqrt':
                result = Math.sqrt(input);
                break;
            case 'factorial':
                result = this.factorial(input);
                break;
            default:
                return;
        }

        this.currentInput = result.toString();
        this.updateDisplay();
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    toggleMode() {
        this.scientificMode = !this.scientificMode;
        const scientificButtons = this.windowElement.querySelector('.scientific-buttons');
        const modeButton = this.windowElement.querySelector('.mode-toggle');
        
        if (this.scientificMode) {
            scientificButtons.style.display = 'grid';
            modeButton.textContent = 'Basic Mode';
        } else {
            scientificButtons.style.display = 'none';
            modeButton.textContent = 'Scientific Mode';
        }
    }

    updateDisplay() {
        this.display.textContent = this.currentInput;
    }
}

// Initialize Calculator
const calculator = new Calculator(document.querySelector('.calculator-window'));
