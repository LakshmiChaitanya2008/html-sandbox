import { useEffect, useState, useRef } from "react";

interface IframeProps {
  files: {
    [key: string]: {
      name: string;
      value: any;
      language: string;
    };
  };
}

const Iframe = function ({ files }: IframeProps) {
  const iframeEl = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeEl.current;

    iframe?.contentWindow?.postMessage(
      { type: "html", value: files["index.html"].value },
      "*"
    );
    iframe?.contentWindow?.postMessage(
      { type: "css", value: files["style.css"].value },
      "*"
    );
    iframe?.contentWindow?.postMessage(
      { type: "javascript", value: files["script.js"].value },
      "*"
    );
  }, [files]);

  return (
    <iframe
      className="h-screen w-full"
      sandbox="allow-scripts"
      ref={iframeEl}
      srcDoc={
        /* html */ `<html>
              <head>
              <style id="styles">
                body {
                  background: linear-gradient(to right, #642b73, #c6426e); 
                }
               
                h1 {
                  text-align: center;
                  font-family: sans-serif;
                  color: #fff;
                }
              </style>
              <script type="module">
                window.addEventListener('message', (event) => {
                  const { type, value } = event.data;

                  if (type === 'html') {
                    document.body.innerHTML = value;
                  }

                  if(type === "css"){
                    document.querySelector("#styles").innerHTML = value;
                  }

                  if(type === "javascript"){
                    const scriptEl = document.createElement('script');
                    const textNodeEl = document.createTextNode(value);
                    scriptEl.type = 'module';
                    scriptEl.appendChild(textNodeEl);
                    document.head.appendChild(scriptEl)
                  }
                }, false)
              </script>
              </head>
              <body>
              <div>
              <h1>Edit the index.html file!</h1>
              </div>
              </body>
            </html>`
      }
    />
  );
};

export default Iframe;
