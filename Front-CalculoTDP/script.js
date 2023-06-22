// Obtenha referência ao campo de texto de processador
const cpuInput = document.getElementById('cpu');

// Obtenha a lista completa de processadores
const processadores = [
    { Cpu: "Intel Core i9-11900K", TdpCpu: 125 },
    { Cpu: "Intel Core i7-11700K", TdpCpu: 125 },
    // ... restante dos processadores
];

// Função para filtrar a lista de processadores com base no texto digitado
function filtrarProcessadores(texto) {
    return processadores.filter(processador =>
        processador.Cpu.toLowerCase().includes(texto.toLowerCase())
    );
}

// Função para exibir os processadores filtrados na lista suspensa
function exibirProcessadoresFiltrados(texto) {
    const processadoresFiltrados = filtrarProcessadores(texto);

    const selectCpu = document.getElementById('cpu');

    // Remover todos os itens existentes da lista suspensa
    while (selectCpu.firstChild) {
        selectCpu.removeChild(selectCpu.firstChild);
    }

    // Criar e adicionar os novos itens filtrados na lista suspensa
    processadoresFiltrados.forEach(processador => {
        const option = document.createElement('option');
        option.value = processador.Cpu;
        option.textContent = processador.Cpu;
        selectCpu.appendChild(option);
    });
}

// Adicionar um ouvinte de eventos de entrada ao campo de texto de processador
cpuInput.addEventListener('input', function () {
    exibirProcessadoresFiltrados(this.value);
});

// Exibir todos os processadores no carregamento inicial da página
exibirProcessadoresFiltrados('');
