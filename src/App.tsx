import React, { useEffect, useState } from "react";
import "./App.css";
import { Button } from "antd";

const App = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          /**
           * Sends a single message to the content script(s) in the specified tab,
           * with an optional callback to run when a response is sent back.
           *
           * The runtime.onMessage event is fired in each content script running
           * in the specified tab for the current extension.
           */
          console.log("tabs=", tabs);
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              console.log("response=", response);
              setTitle(response.title);
            }
          );
        }
      );

    // Change color
    // Initialize button with users' preferred color
    let changeColor = document.getElementById("changeColor");

    chrome.storage &&
      chrome.storage.sync.get("color", ({ color }) => {
        if (changeColor) {
          changeColor.style.backgroundColor = color;
        }
      });

    // When the button is clicked, inject setPageBackgroundColor into current page
    changeColor?.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      chrome.scripting.executeScript({
        target: { tabId: Number(tab.id) },
        func: setPageBackgroundColor,
      });
    });

    // The body of this function will be executed as a content script inside the
    // current page
    function setPageBackgroundColor() {
      chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" id="changeColor">
          Change background
        </Button>
        {title}
      </header>
    </div>
  );
};

export default App;
