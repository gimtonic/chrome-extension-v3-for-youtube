// const messagesFromReactAppListener = (
//   msg: DOMMessage,
//   sender: chrome.runtime.MessageSender,
//   sendResponse: (response: DOMMessageResponse) => void
// ) => {
//   console.log("[content.js]. Message received", msg);

//   const headlines = Array.from(document.getElementsByTagName<"h1">("h1")).map(
//     (h1) => h1.innerText
//   );

//   // Prepare the response object with information about the site
//   const response: DOMMessageResponse = {
//     title: document.title,
//     headlines,
//   };

//   console.log("[content.js]. Message response", response);

//   sendResponse(response);
// };

// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

export {};
