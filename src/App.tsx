import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Tabs } from "./components/Tabs";
import { emmetHTML } from "emmet-monaco-es";
import useLocalStorage from "./hooks/useLocalStorage";
import Iframe from "./components/Iframe";

function App() {
  interface files {
    [key: string]: {
      name: string;
      value: any;
      language: string;
    };
  }

  const [html, setHtml] = useLocalStorage("html");
  const [css, setCSS] = useLocalStorage("css");
  const [js, setJS] = useLocalStorage("js");

  const [files, setFiles] = useState<files>({
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: js,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: css,
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: html,
    },
  });

  const [fileName, setFileName] = useState("index.html");

  const file = files[fileName];

  const handleChange = function (value: any, event: any) {
    if (file.name === "index.html") {
      setHtml("html", value);
      setFiles({
        ...files,
        "index.html": {
          name: "index.html",
          language: "html",
          value,
        },
      });
    }

    if (file.name === "style.css") {
      setCSS("css", value);
      setFiles({
        ...files,
        "style.css": {
          name: "style.css",
          language: "css",
          value,
        },
      });
    }
    if (file.name === "script.js") {
      setJS("js", value);
      setFiles({
        ...files,
        "script.js": {
          name: "script.js",
          language: "javascript",
          value,
        },
      });
    }

    // const html = `
    // <html>
    //   <head>
    //     <style>
    //       ${files["style.css"].value}
    //     </style>
    //   </head>
    //   <body>
    //     ${files["index.html"].value}
    //   </body>
    //     <script>
    //       ${files["script.js"].value}
    //     </script>
    // </html>`;

    // const test = { type: "html", value: html };

    // iframe.current?.contentWindow?.postMessage(test, "*");
  };

  const handleMount = function () {
    emmetHTML((window as any).monaco);
  };

  return (
    <>
      <h1 className="lg:hidden text-2xl text-center">
        Why can't you use a computer?
      </h1>
      <div className="App">
        <div className="header w-full shadow-2xl">
          <h1 className="text-center text-3xl p-4">HTML Sandbox 😎</h1>

          <div className="tabs w-1/5 p-2 flex justify-around">
            <Tabs file={file} fileName={fileName} setFileName={setFileName} />
          </div>
          <div className="flex">
            <div className="w-1/2 editor ">
              <Editor
                height="100vh"
                theme="vs-dark"
                onChange={handleChange}
                onMount={handleMount}
                options={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  minimap: {
                    enabled: false,
                  },
                }}
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
              />
            </div>
            <div className="w-1/2 h-screen bg-white">
              <Iframe file={file} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
