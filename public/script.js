// Array com os processadores disponíveis
var processadores = [
  "Intel Core i5-11600K",
  "Intel Core i9-10900K",
  // Resto do array...
];

// Array com as GPUs disponíveis
var gpus = [
  "NVIDIA GeForce RTX 3080",
  "AMD Radeon RX 6800 XT",
  // Resto do array...
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

// Função para enviar os dados selecionados para o servidor
function enviarDados() {
  var processador = document.getElementById('cpu').value;
  var gpu = document.getElementById('gpu').value;

  // Enviar os dados para o servidor
  // Substitua 'http://seuservidor.com/endpoint' pelo endpoint correto
  fetch('https://localhost:44384/api/ComputersCreate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      processador: processador,
      gpu: gpu
    })
  })
  .then(function(response) {
    // Tratar a resposta do servidor aqui
  })
  .catch(function(error) {
    console.error('Erro ao enviar os dados:', error);
  });
}

// Evento para enviar os dados quando o usuário clicar no botão "Enviar"
document.getElementById('enviar').addEventListener('click', enviarDados);
