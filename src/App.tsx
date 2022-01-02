import React from "react";
import "./App.css";
// import { Button, Switch, Card, Space } from "antd";
// import { getItem, setItem } from "./store";
// import { executeScriptNotRecomendsVideo } from "./helpers";

const App = () => {
  // const [title, setTitle] = useState("");
  // const [isChecked, setIsChecked] = useState(false);

  // const setDefaultIsChecked = useCallback(async () => {
  //   const isChecked = (await getItem("isChecked")) as boolean;
  //   setIsChecked(isChecked ?? false);
  // }, []);

  // const handleChangeBackground = async () => {
  //   let [tab] = await chrome.tabs.query({
  //     active: true,
  //     currentWindow: true,
  //   });

  //   chrome.scripting.executeScript({
  //     target: { tabId: Number(tab.id) },
  //     func: executeScriptSetPageBackgroundColor,
  //   });
  // };

  // const executeScriptSetPageBackgroundColor = () => {
  //   chrome.storage.sync.get("color", ({ color }) => {
  //     document.body.style.backgroundColor = color;
  //   });
  // };

  // const handleNotRecomendsVideo = useCallback(async (checked: boolean) => {
  //   setIsChecked(checked);
  //   await setItem("isChecked", checked);

  //   if (checked) {
  //     const [tab] = await chrome.tabs.query({
  //       active: true,
  //       currentWindow: true,
  //     });
  //     chrome.scripting.executeScript({
  //       target: { tabId: Number(tab.id) },
  //       func: executeScriptNotRecomendsVideo,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   setDefaultIsChecked();
  // }, [setDefaultIsChecked]);

  // useEffect(() => {
  //   handleNotRecomendsVideo(isChecked);
  // }, [handleNotRecomendsVideo, isChecked]);

  // useEffect(() => {
  //   chrome.tabs &&
  //     chrome.tabs.query(
  //       {
  //         active: true,
  //         currentWindow: true,
  //       },
  //       (tabs) => {
  //         console.log("tabs=", tabs);
  //         chrome.tabs.sendMessage(
  //           tabs[0].id || 0,
  //           { type: "GET_DOM" } as DOMMessage,
  //           (response: DOMMessageResponse) => {
  //             console.log("response=", response);
  //             setTitle(response.title);
  //           }
  //         );
  //       }
  //     );
  // }, []);

  return <>Youtube recomended videos is blocked</>;
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <Card title={title} style={{ width: 300 }}>
  //         <p>
  //           <Button type="primary" onClick={handleChangeBackground}>
  //             Change background
  //           </Button>
  //         </p>
  //         <p>
  //           <Space size="small">
  //             <Switch checked={isChecked} onChange={handleNotRecomendsVideo} />
  //             Not recomends video
  //           </Space>
  //         </p>
  //       </Card>
  //     </header>
  //   </div>
  // );
};

export default App;
