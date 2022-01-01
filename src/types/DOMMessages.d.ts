type DOMMessage = {
  type: "GET_DOM";
};

type DOMMessageResponse = {
  title: string;
  headlines: string[];
};
