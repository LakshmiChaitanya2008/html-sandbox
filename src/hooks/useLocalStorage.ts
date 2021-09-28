import { useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    let item;

    if (key === "html") {
      item =
        localStorage.getItem("html") ||
        `<h1>HTML SANDBOX!</h1>
<img src="https://c.tenor.com/u9XnPveDa9AAAAAM/rick-rickroll.gif" />
      `;
    } else if (key === "css") {
      item =
        localStorage.getItem("css") ||
        `body{
  background-color: #272b33;
  text-align:center;
  color: #eee;
  font-family: "Arial", sans-serif;
}
`;
    } else item = localStorage.getItem("js");

    return item ? item : "";
  });

  const setItem = function (key: string, initValue: any) {
    const valueToStorage =
      typeof initValue === "function" ? initValue() : initValue;

    setValue(valueToStorage);

    localStorage.setItem(key, valueToStorage);
  };

  return [value, setItem] as const;
};

export default useLocalStorage;
