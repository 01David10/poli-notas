document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-btn input");
  const apunteCards = document.querySelectorAll(".apunte-card");

  // 1. Búsqueda
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      apunteCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 2. Redirección
  apunteCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    let redirectURL = "#";

    if (title.includes("álgebra")) {
      redirectURL = "algebra.html";
    } else if (title.includes("algoritmos")) {
      redirectURL = "algoritmos.html";
    } else if (title.includes("base de datos")) {
      redirectURL = "basededatos.html";
    }

    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      if (redirectURL !== "#") {
        window.location.href = redirectURL;
      }
    });
  });
});
