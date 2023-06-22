document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("cpu");
    const suggestions = document.getElementById("suggestions");
    let selectedProcessadorIndex = -1;
  
    const processadores = [
      "Intel Core i9-11900K",
      "Intel Core i7-11700K"
    ];
  
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
        case "Escape":
          event.preventDefault();
          suggestions.innerHTML = "";
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
  