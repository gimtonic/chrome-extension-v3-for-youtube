import {
  executeScriptDisabledButtons,
  executeScriptNotSearchNotRecomendsVideo,
} from "../helpers";

const color = "#3aa757";

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === "loading" &&
    tab.url === "https://www.youtube.com/"
  ) {
    console.log("redirect");
    chrome.tabs.update(tabId, {
      url: "https://www.youtube.com/feed/subscriptions",
    });
  }

  if (
    changeInfo.status === "complete" &&
    tab.active &&
    tab.url?.matchAll(/www.youtube.com/g)
  ) {
    // set color
    chrome.runtime.onInstalled.addListener(() => {
      chrome.storage.sync.set({ color });
    });

    // bookmarks
    // Traverse the bookmark tree, and print the folder and nodes.
    // chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
    //   console.log("bookmarkTreeNodes=", bookmarkTreeNodes);
    // });

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: Number(tab.id) },
      func: executeScriptDisabledButtons,
    });

    chrome.scripting.executeScript({
      target: { tabId: Number(tab.id) },
      func: executeScriptNotSearchNotRecomendsVideo,
    });
  }
});

export {};
