export const executeScriptDisabledButtons = () => {
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
      (items[1] as HTMLElement).style.display = "none";
      (items[2] as HTMLElement).style.display = "none";
      (items[4] as HTMLElement).style.display = "none";
    }
  }, 2000);
};

export const executeScriptNotSearchNotRecomendsVideo = () => {
  const searchInput =
    document.getElementById("search-input")?.firstElementChild;

  if (searchInput instanceof HTMLInputElement) {
    searchInput.onchange = (e) => {
      const notsearchVideoTags = [
        "hardcore",
        "mma",
        "куплинов",
        "labelcom",
        "наше дело",
        "райз",
        "fighting",
        "top dog",
        "махач",
        "самый умный комик",
        "факты",
        "ох",
        "lena kuka",
        "чбд",
        "блиц крик",
      ];
      const filterSearch = (searchText: string) => {
        let isFilterSearch = false;
        notsearchVideoTags.forEach((notsearchVideoTag) => {
          if (searchText.search(notsearchVideoTag) !== -1) {
            isFilterSearch = true;
          }
        });

        return isFilterSearch;
      };

      const { value: searchText } = e.target as HTMLInputElement;
      const isFilterSearch = filterSearch(searchText);

      if (isFilterSearch) {
        console.log("reset search value text");
        (e.target as HTMLInputElement).value = "";
        document.location.href = "https://www.youtube.com/feed/subscriptions";
      }
    };
  }
};
