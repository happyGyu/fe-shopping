import { serverURL } from "./constant.js";

export const getData = (...path) => {
  const url = `${serverURL}${path.join("/")}`;
  return fetch(url).then((response) => response.json());
};

export const getAutoCompleteData = (prefix) => {
  return fetch(
    `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${[prefix]}`
  )
    .then((res) => res.json())
    .then((data) => data.suggestions.map((v) => v.value));
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

