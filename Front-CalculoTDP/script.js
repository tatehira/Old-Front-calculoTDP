document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("cpu");
    const suggestions = document.getElementById("suggestions");
    let selectedProcessadorIndex = -1;
  
    const processadores = [
        "Intel Core i9-11900K",
        "Intel Core i7-11700K",
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
        "Xeon E5-2683 v4"
    ];


    const cpuInput = document.getElementById('cpu');

    cpuInput.addEventListener('blur', () => {
    clearSuggestions();
    });

    function clearSuggestions() {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    }

  
    input.addEventListener("input", function() {
      const query = input.value.trim().toLowerCase();
      const matchingProcessadores = processadores.filter(processador =>
        processador.toLowerCase().startsWith(query)
      );
  
      if (matchingProcessadores.length > 0) {
        const suggestionsHTML = matchingProcessadores
          .map((processador, index) =>
            `<li class="${index === selectedProcessadorIndex ? 'selected' : ''}">${processador}</li>`
          )
          .join("");
        suggestions.innerHTML = suggestionsHTML;
      } else {
        suggestions.innerHTML = "";
      }
    });
  
    input.addEventListener("keydown", function(event) {
      const matchingProcessadores = suggestions.querySelectorAll("li");
  
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          selectedProcessadorIndex = Math.max(selectedProcessadorIndex - 1, 0);
          break;
        case "ArrowDown":
          event.preventDefault();
          selectedProcessadorIndex = Math.min(selectedProcessadorIndex + 1, matchingProcessadores.length - 1);
          break;
        case "Enter":
          if (selectedProcessadorIndex !== -1 && matchingProcessadores.length > 0) {
            event.preventDefault();
            const selectedProcessador = matchingProcessadores[selectedProcessadorIndex].textContent;
            input.value = selectedProcessador;
            suggestions.innerHTML = "";
          }
          break;
      }
  
      matchingProcessadores.forEach((processador, index) => {
        processador.classList.toggle("selected", index === selectedProcessadorIndex);
      });
    });
  
    suggestions.addEventListener("mousedown", function(event) {
      const selectedProcessador = event.target.textContent;
      input.value = selectedProcessador;
      suggestions.innerHTML = "";
    });
  });
  