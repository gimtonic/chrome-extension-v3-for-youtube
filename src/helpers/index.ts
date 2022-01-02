export const executeScriptNotRecomendsVideo = () => {
  const logo = document.getElementById("start");
  if (logo) {
    logo.style.display = "none";
  }

  const sections = document.getElementById("sections");
  if (sections) {
    sections.style.display = "none";
  }

  setTimeout(() => {
    const items = document.getElementsByClassName(
      "style-scope ytd-mini-guide-renderer"
    );

    if (items.length > 0) {
      console.log("items=", items);
      (items[1] as HTMLElement).style.display = "none";
      (items[3] as HTMLElement).style.display = "none";
      (items[4] as HTMLElement).style.display = "none";
    }
  }, 2000);
};
