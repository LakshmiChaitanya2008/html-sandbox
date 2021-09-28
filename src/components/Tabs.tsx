interface TabsProps {
  file: {
    name: string;
    language: string;
    value: string;
  };

  fileName: string;

  setFileName: Function;
}

export const Tabs = ({ file, fileName, setFileName }: TabsProps) => {
  return (
    <>
      <button
        className={`${
          file.language === "html" ? "bg-red-600" : "bg-yellow-600"
        } w-20 border-1 border-black `}
        disabled={fileName === "index.html"}
        onClick={() => setFileName("index.html")}
      >
        index.html
      </button>

      <button
        className={`${
          file.language === "css" ? "bg-red-600" : "bg-yellow-600"
        } w-20 border-1 border-black`}
        disabled={fileName === "style.css"}
        onClick={() => setFileName("style.css")}
      >
        styles.css
      </button>

      <button
        className={`${
          file.language === "javascript" ? "bg-red-600" : "bg-yellow-600"
        } w-20 border-1 border-black`}
        disabled={fileName === "script.js"}
        onClick={() => setFileName("script.js")}
      >
        script.js
      </button>
    </>
  );
};
