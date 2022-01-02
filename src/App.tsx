import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Switch, Card, Space } from "antd";

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
  }, []);

  const handleChangeBackground = async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: Number(tab.id) },
      func: executeScriptSetPageBackgroundColor,
    });
  };

  const executeScriptSetPageBackgroundColor = () => {
    console.log("change background color");
    chrome.storage.sync.get("color", ({ color }) => {
      console.log("color=", color);
      document.body.style.backgroundColor = color;
    });
  };

  const handleNotRecomendsVideo = async (checked: boolean) => {
    console.log(`switch to ${checked}`);

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: Number(tab.id) },
      func: executeScriptNotRecomendsVideo,
    });
  };

  const executeScriptNotRecomendsVideo = () => {
    console.log("disable");
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card title={title} style={{ width: 300 }}>
          <p>
            <Button type="primary" onClick={handleChangeBackground}>
              Change background
            </Button>
          </p>
          <p>
            <Space size="small">
              <Switch defaultChecked onChange={handleNotRecomendsVideo} />
              Not recomends video
            </Space>
          </p>
        </Card>
      </header>
    </div>
  );
};

export default App;
