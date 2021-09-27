import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Tabs } from "./Tabs";
import { Iframe } from "./Iframe";
import { emmetHTML } from "emmet-monaco-es";

function App() {
  interface files {
    [key: string]: {
      name: string;
      value: string;
      language: string;
    };
  }

  const [files, setFiles] = useState<files>({
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: "",
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: `body {
  background-color: #1f1f1f;
  color: white;
  text-align: center;
  font-family: "Arial";
}
      `,
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: /*html */ `<h1>Welcome to HTML Sandbox</h1>

<img src="https://svelte.dev/tutorial/image.gif" />`,
    },
  });

  const [fileName, setFileName] = useState("index.html");

  const file = files[fileName];

  const handleChange = function (value: any, event: any) {
    if (file.name === "index.html") {
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
      setFiles({
        ...files,
        "script.js": {
          name: "script.js",
          language: "javascript",
          value: value,
        },
      });
    }
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

          <div className="flex h-screen">
            <div className="w-1/2 editor">
              <Editor
                height="100vh"
                theme="vs-dark"
                onChange={handleChange}
                onMount={handleMount}
                options={{
                  fontFamily: "IBM plex mono",
                  fontSize: 18,
                  minimap: {
                    enabled: false,
                  },
                }}
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
              />
              ]{" "}
            </div>
            <div className="w-1/2 h-screen bg-white">
              <Iframe files={files} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
