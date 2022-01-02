import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { Button, Switch, Card, Space } from "antd";
import { getItem, setItem } from "./store";
import { executeScriptNotRecomendsVideo } from "./helpers";

const App = () => {
  const [title, setTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const setDefaultIsChecked = useCallback(async () => {
    const isChecked = (await getItem("isChecked")) as boolean;
    setIsChecked(isChecked ?? false);
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

  const handleNotRecomendsVideo = useCallback(async (checked: boolean) => {
    console.log("checked=", checked);
    setIsChecked(checked);
    await setItem("isChecked", checked);

    if (checked) {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: Number(tab.id) },
        func: executeScriptNotRecomendsVideo,
      });

      // /feed/subscriptions
    }
  }, []);

  useEffect(() => {
    setDefaultIsChecked();
  }, [setDefaultIsChecked]);

  useEffect(() => {
    handleNotRecomendsVideo(isChecked);
  }, [handleNotRecomendsVideo, isChecked]);

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
              <Switch checked={isChecked} onChange={handleNotRecomendsVideo} />
              Not recomends video
            </Space>
          </p>
        </Card>
      </header>
    </div>
  );
};

export default App;
