"use strict";

(() => {
  const installButton = document.querySelector("#install-app");
  const toast = document.querySelector("#toast");
  let installPrompt = null;
  let toastTimer = 0;
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

  function showPwaMessage(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 4200);
  }

  if (isStandalone) installButton.hidden = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = isStandalone;
  });

  installButton.addEventListener("click", async () => {
    if (!installPrompt) {
      showPwaMessage("Para instalar Órbita, abre el menú del navegador y elige “Instalar aplicación” o “Añadir a pantalla de inicio”.");
      return;
    }
    const prompt = installPrompt;
    installPrompt = null;
    try {
      prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") {
        showPwaMessage("Chrome está preparando la instalación. Espera a que termine antes de abrir Órbita.");
      }
    } catch (error) {
      console.error("Chrome no pudo iniciar la instalación de Órbita.", error);
      showPwaMessage("Chrome no pudo iniciar la instalación. Inténtalo desde el menú ⋮ del navegador.");
    }
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    installButton.hidden = true;
    showPwaMessage("Órbita se instaló correctamente en tu dispositivo.");
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("No se pudo registrar el modo sin conexión de Órbita.", error);
      showPwaMessage("No se pudo activar el modo sin conexión. Puedes seguir usando Órbita en línea.");
    });
  }
})();
