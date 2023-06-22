// Array com os processadores disponíveis
var processadores = [
  "Intel Core i5-11600K",
  "Intel Core i9-10900K",
  "Intel Core i7-10700K",
  "Intel Core i5-10400F",
  "Intel Core i7-9700K",
  "Intel Core i9-12900K",
  "Intel Core i7-12700K",
  "Intel Core i5-12600K",
  "Intel Core i9-11900KF",
  "Intel Core i7-11700KF",
  "Intel Core i9-10900KF",
  "Intel Core i7-10700KF",
  "Intel Core i5-10400",
  "Intel Core i7-9700KF",
  "AMD Ryzen 9 5950X",
  "AMD Ryzen 9 5900X",
  "AMD Ryzen 7 5800X",
  "AMD Ryzen 5 5600X",
  "Intel Core i5-10600K",
  "Intel Core i9-10850K",
  "AMD Ryzen 7 3700X",
  "AMD Ryzen 5 3600X",
  "AMD Ryzen 9 5900HX",
  "AMD Ryzen 7 5800HX",
  "AMD Ryzen 5 5600H",
  "AMD Ryzen 9 5950H",
  "AMD Ryzen 7 3700XT",
  "AMD Ryzen 5 3600XT",
  "Xeon E3-1220 v3",
  "Xeon E3-1230 v3",
  "Xeon E5-2620 v4",
  "Xeon E5-1650 v3",
  "Xeon E5-2680 v4",
  "Xeon E5-2690 v3",
  "Xeon E3-1270 v5",
  "Xeon E3-1230 v3",
  "Xeon E5-2630 v4",
  "Xeon E5-1660 v3",
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

var sugestoesProcessador = [];
var sugestoesGPU = [];
var sugestaoAtualProcessador = -1;
var sugestaoAtualGPU = -1;

// Função para realizar a pesquisa e exibir as sugestões de processador
function pesquisarProcessador() {
  var input = document.getElementById('cpu');
  var valorDigitado = input.value.toLowerCase();

  sugestaoAtualProcessador = -1;

  // Limpar as sugestões
  document.getElementById('suggestions').innerHTML = '';

  if (valorDigitado.length === 0) {
      return;
  }

  // Filtrar os processadores com base no valor digitado
  sugestoesProcessador = processadores.filter(function(processador) {
      return processador.toLowerCase().indexOf(valorDigitado) !== -1;
  });

  // Exibir as sugestões
  sugestoesProcessador.forEach(function(sugestao, index) {
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

  sugestaoAtualGPU = -1;

  // Limpar as sugestões
  document.getElementById('suggestions').innerHTML = '';

  if (valorDigitado.length === 0) {
      return;
  }

  // Filtrar as GPUs com base no valor digitado
  sugestoesGPU = gpus.filter(function(gpu) {
      return gpu.toLowerCase().indexOf(valorDigitado) !== -1;
  });

  // Exibir as sugestões
  sugestoesGPU.forEach(function(sugestao, index) {
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

// Função para selecionar uma sugestão de processador
function selecionarSugestaoProcessador() {
  var input = document.getElementById('cpu');
  if (sugestaoAtualProcessador >= 0 && sugestaoAtualProcessador < sugestoesProcessador.length) {
      input.value = sugestoesProcessador[sugestaoAtualProcessador];
      ocultarSugestoes();
  }
}

// Função para selecionar uma sugestão de GPU
function selecionarSugestaoGPU() {
  var input = document.getElementById('gpu');
  if (sugestaoAtualGPU >= 0 && sugestaoAtualGPU < sugestoesGPU.length) {
      input.value = sugestoesGPU[sugestaoAtualGPU];
      ocultarSugestoes();
  }
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

// Evento para navegar pelas sugestões usando as setas do teclado no campo de processador
document.getElementById('cpu').addEventListener('keydown', function(event) {
  if (sugestoesProcessador.length === 0) {
      return;
  }

  if (event.key === 'ArrowUp') {
      event.preventDefault();
      sugestaoAtualProcessador = (sugestaoAtualProcessador - 1 + sugestoesProcessador.length) % sugestoesProcessador.length;
      atualizarSugestaoSelecionada('cpu');
  } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      sugestaoAtualProcessador = (sugestaoAtualProcessador + 1) % sugestoesProcessador.length;
      atualizarSugestaoSelecionada('cpu');
  } else if (event.key === 'Enter') {
      event.preventDefault();
      selecionarSugestaoProcessador();
  }
});

// Evento para navegar pelas sugestões usando as setas do teclado no campo de GPU
document.getElementById('gpu').addEventListener('keydown', function(event) {
  if (sugestoesGPU.length === 0) {
      return;
  }

  if (event.key === 'ArrowUp') {
      event.preventDefault();
      sugestaoAtualGPU = (sugestaoAtualGPU - 1 + sugestoesGPU.length) % sugestoesGPU.length;
      atualizarSugestaoSelecionada('gpu');
  } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      sugestaoAtualGPU = (sugestaoAtualGPU + 1) % sugestoesGPU.length;
      atualizarSugestaoSelecionada('gpu');
  } else if (event.key === 'Enter') {
      event.preventDefault();
      selecionarSugestaoGPU();
  }
});

// Função para atualizar a sugestão selecionada visualmente
function atualizarSugestaoSelecionada(inputId) {
  var sugestoes = document.getElementById('suggestions').getElementsByTagName('li');
  for (var i = 0; i < sugestoes.length; i++) {
      sugestoes[i].classList.remove('selected');
  }

  if (inputId === 'cpu') {
      sugestoes[sugestaoAtualProcessador].classList.add('selected');
  } else if (inputId === 'gpu') {
      sugestoes[sugestaoAtualGPU].classList.add('selected');
  }
}

