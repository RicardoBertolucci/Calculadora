let display = document.querySelector(".calculator__display");
let buttons = document.querySelector(".calculator__buttons");

// Operators
let remove = document.querySelector(".calculator__button--remove");
let clean = document.querySelector(".calculator__button--clean");

// Variáveis de Armazenamento
let a, operator, b;

// Funções
const cleanDisplay = () => {
  display.textContent = "0";
};

const removeCharacter = () => {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    let input = display.textContent;
    display.textContent = input.slice(0, input.length - 1);
  }
};

const formatNumbers = (a, b) => {
  if (a.includes(",")) {
    let newA = a.replace(",", ".");
    a = newA;
  }

  if (b.includes(",")) {
    let newB = b.replace(",", ".");
    b = newB;
  }

  a = Number(a);
  b = Number(b);

  return [a, b];
};

const sum = (a, b) => {
  return a + b;
};

const subtraction = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const division = (a, b) => {
  return a / b;
};

const percentage = (a, b) => {
  return a * (b / 100);
};

buttons.addEventListener("click", (e) => {
  // Previnir o evento de reload da página
  e.preventDefault();

  // Pega o botão clicado na calculadora
  let value = e.target;

  if (value === clean) {
    cleanDisplay();
  }

  if (value === remove) {
    removeCharacter();
  }

  if (value.classList.contains("calculator__button--comma")) {
    if (!display.textContent.includes(",")) {
      display.textContent += value.textContent;
    }
  }

  if (value.classList.contains("calculator__button--number")) {
    if (display.textContent === "0") {
      display.textContent = "";
    }

    // Qualquer valor truthy(verdadeiro) E display não vazio E qualquer valor falso
    if (operator && display.textContent !== "" && !b) {
      display.textContent = "";
      b = value.textContent;
    }

    display.textContent += value.textContent;
  }

  if (value.classList.contains("operator")) {
    if (value.classList.contains("calculator__button--inverse")) {
      // Preciso verificar se na string possui um -
      if (display.textContent.includes("-")) {
        // remove o -
        let input = display.textContent;
        input = input.slice(1, input.length);
        console.log(input);
        display.textContent = input;
      } else {
        // adiciona o -
        display.textContent = `-${display.textContent}`;
      }
    } else {
      // Armazena o valor do display como variável A
      a = display.textContent;

      // Armazena o operador
      operator = value.textContent;
    }
  }

  if (value.classList.contains("calculator__button--equal")) {
    b = display.textContent;
    console.log(a, operator, b);

    let arr = formatNumbers(a, b);

    [a, b] = arr;

    if (operator.includes("+")) {
      result = sum(a, b);

      display.textContent = result;
    }

    if (operator.includes("-")) {
      result = subtraction(a, b);

      display.textContent = result;
    }

    if (operator.includes("x") || operator.includes("X")) {
      result = multiply(a, b);

      display.textContent = result;
    }

    if (operator.includes("/")) {
      result = division(a, b);

      display.textContent = result;
    }

    if (operator.includes("%")) {
      result = percentage(a, b);

      display.textContent = result;
    }

    a = "";
    b = "";
    operator = "";
  }
});
