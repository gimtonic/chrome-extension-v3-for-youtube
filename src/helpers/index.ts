export const executeScriptNotRecomendsVideo = () => {
  const logo = document.getElementById("start");
  if (logo) {
    logo.style.display = "none";
  }

  const mainIcon = document.querySelector("[title=Главная]");
  if (mainIcon) {
    (mainIcon as HTMLElement).style.display = "none";
  }

  const navigatorIcon = document.querySelector("[title=Навигатор]");
  if (navigatorIcon) {
    (navigatorIcon as HTMLElement).style.display = "none";
  }

  const libraryIcon = document.querySelector("[title=Библиотека]");
  if (libraryIcon) {
    (libraryIcon as HTMLElement).style.display = "none";
  }
};
