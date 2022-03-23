import { serverURL } from "./constant.js";

export const getData = async (...path) => {
  const url = `${serverURL}${path.join("/")}`;
  const data = (await fetch(url)).json();
  return data;
};

export const getAutoCompleteSuggestions = async (prefix) => {
  const amazonURL = `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${prefix}`;
  const autoCompleteData = await (await fetch(amazonURL)).json();
  const autoCompleteSuggestions = autoCompleteData.suggestions.map((v) => v.value);
  return autoCompleteSuggestions;
};

export const debounce = (callback, time) => {
  let debounceID;
  return () => {
    if (debounceID) {
      clearTimeout(debounceID);
    }
    debounceID = setTimeout(callback, time);
  };
};

export const cross2D = (v1, v2) => {
  return v1[0] * v2[1] - v1[1] * v2[0];
};


