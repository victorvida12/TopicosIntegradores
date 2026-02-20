// Seleciona o botão pelo ID
const mudarCorBtn = document.getElementById('mudarCorBtn');

// Array de cores possíveis
const cores = ['#ffcccc', '#ccffcc', '#ccccff', '#ffcc99', '#99ccff'];

// Função para mudar a cor de fundo
mudarCorBtn.addEventListener('click', () => {
  // Seleciona uma cor aleatória do array
  const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
  // Aplica a cor ao fundo da página
  document.body.style.backgroundColor = corAleatoria;
});