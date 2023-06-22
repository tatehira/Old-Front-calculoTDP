// Array com os processadores disponíveis
var processadores = [
  "Intel Core i9-11900K",
  "AMD Ryzen 9 5950X",
  "Intel Core i7-11700K",
  "AMD Ryzen 7 5800X",
  "Intel Core i5-11600K",
  "AMD Ryzen 5 5600X"
];

// Array com as GPUs disponíveis
var gpus = [
  "NVIDIA GeForce RTX 3080",
  "AMD Radeon RX 6800 XT",
  "NVIDIA GeForce RTX 3070",
  "AMD Radeon RX 6700 XT",
  "NVIDIA GeForce RTX 3060",
  "AMD Radeon RX 6600 XT"
];

// Função para realizar a pesquisa e exibir as sugestões de processador
function pesquisarProcessador() {
  var input = document.getElementById('cpu');
  var valorDigitado = input.value.toLowerCase();

  // Limpar as sugestões
  document.getElementById('suggestions').innerHTML = '';

  if (valorDigitado.length === 0) {
      return;
  }

  // Filtrar os processadores com base no valor digitado
  var sugestoes = processadores.filter(function(processador) {
      return processador.toLowerCase().indexOf(valorDigitado) !== -1;
  });

  // Exibir as sugestões
  sugestoes.forEach(function(sugestao) {
      var sugestaoItem = document.createElement('li');
      sugestaoItem.textContent = sugestao;
      sugestaoItem.addEventListener('click', function() {
          input.value = sugestao;
          document.getElementById('suggestions').innerHTML = '';
      });
      document.getElementById('suggestions').appendChild(sugestaoItem);
  });
}

// Função para realizar a pesquisa e exibir as sugestões de GPU
function pesquisarGPU() {
  var input = document.getElementById('gpu');
  var valorDigitado = input.value.toLowerCase();

  // Limpar as sugestões
  document.getElementById('suggestions').innerHTML = '';

  if (valorDigitado.length === 0) {
      return;
  }

  // Filtrar as GPUs com base no valor digitado
  var sugestoes = gpus.filter(function(gpu) {
      return gpu.toLowerCase().indexOf(valorDigitado) !== -1;
  });

  // Exibir as sugestões
  sugestoes.forEach(function(sugestao) {
      var sugestaoItem = document.createElement('li');
      sugestaoItem.textContent = sugestao;
      sugestaoItem.addEventListener('click', function() {
          input.value = sugestao;
          document.getElementById('suggestions').innerHTML = '';
      });
      document.getElementById('suggestions').appendChild(sugestaoItem);
  });
}

// Função para ocultar a lista de sugestões
function ocultarSugestoes() {
  document.getElementById('suggestions').innerHTML = '';
}

// Evento para chamar a função de pesquisa quando o usuário digitar no campo de processador
document.getElementById('cpu').addEventListener('input', pesquisarProcessador);

// Evento para chamar a função de pesquisa quando o usuário digitar no campo de GPU
document.getElementById('gpu').addEventListener('input', pesquisarGPU);

// Evento para ocultar a lista de sugestões quando o usuário clicar fora do campo de processador
document.addEventListener('click', function(event) {
  var cpuInput = document.getElementById('cpu');
  if (event.target !== cpuInput) {
      ocultarSugestoes();
  }
});

// Evento para ocultar a lista de sugestões quando o usuário pressionar a tecla "Esc"
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      ocultarSugestoes();
  }
});
