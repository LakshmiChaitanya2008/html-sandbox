import { useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item ? item : "";
  });

  const setItem = function (key: string, initValue: any) {
    const valueToStorage =
      typeof initValue === "function" ? initValue() : initValue;

    setValue(valueToStorage);

    localStorage.setItem(key, valueToStorage);
  };

  return [value, setItem];
};

export default useLocalStorage;
