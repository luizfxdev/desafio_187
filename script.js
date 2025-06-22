// Elementos do DOM
const codeInput = document.getElementById('code-input');
const decipherBtn = document.getElementById('decipher-btn');
const resetBtn = document.getElementById('reset-btn');
const resultOutput = document.getElementById('result-output');
const calculationSteps = document.getElementById('calculation-steps');

// Função principal para decifrar o código
function decipherCode(code) {
  let steps = []; // Armazenar os passos do cálculo

  // Passo 1: Inverter a string
  const reversed = code.split('').reverse().join('');
  steps.push(`1. Invertendo a string: <strong>${code}</strong> → <strong>${reversed}</strong>`);

  // Passo 2: Converter maiúsculas/minúsculas
  const caseSwapped = reversed
    .split('')
    .map(char => {
      if (char === char.toUpperCase() && char !== char.toLowerCase()) {
        return char.toLowerCase();
      } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
        return char.toUpperCase();
      }
      return char;
    })
    .join('');
  steps.push(`2. Trocando maiúsculas/minúsculas: → <strong>${caseSwapped}</strong>`);

  // Passo 3: Processar dígitos
  const processedDigits = caseSwapped
    .split('')
    .map(char => {
      if (/\d/.test(char)) {
        const digit = parseInt(char);
        if (digit % 2 === 0) {
          // Dígito par - dividir por 2
          const result = digit / 2;
          steps.push(`   - Dígito par ${digit} → ${result}`);
          return result.toString();
        } else {
          // Dígito ímpar - multiplicar por 3
          const result = digit * 3;
          steps.push(`   - Dígito ímpar ${digit} → ${result}`);
          return result.toString();
        }
      }
      return char;
    })
    .join('');
  steps.push(`3. Processando dígitos: → <strong>${processedDigits}</strong>`);

  return {
    result: processedDigits,
    steps: steps
  };
}

// Evento para o botão DECIFRAR
decipherBtn.addEventListener('click', () => {
  const inputCode = codeInput.value.trim();

  if (!inputCode) {
    resultOutput.textContent = 'Por favor, insira um código para decifrar.';
    calculationSteps.innerHTML = '';
    return;
  }

  const { result, steps } = decipherCode(inputCode);

  resultOutput.textContent = result;
  calculationSteps.innerHTML = '<p>Passos do cálculo:</p>' + steps.map(step => `<p>${step}</p>`).join('');
});

// Evento para o botão RETORNAR
resetBtn.addEventListener('click', () => {
  codeInput.value = '';
  resultOutput.textContent = '';
  calculationSteps.innerHTML = '';
});

// Animação adicional para os botões
[decipherBtn, resetBtn].forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-3px)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
  });
});
