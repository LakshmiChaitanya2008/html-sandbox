import { useEffect, useRef } from "react";

interface IframeProps {
  file: {
    name: string;
    value: any;
    language: string;
  };
}

const Iframe = function ({ file }: IframeProps) {
  const { language, value } = file;

  const iframeEl = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeEl.current;

    if (language === "html") {
      iframe?.contentWindow?.postMessage({ type: "html", value }, "*");
    }
    if (language === "css") {
      iframe?.contentWindow?.postMessage({ type: "css", value }, "*");
    }

    if (language === "js") {
      iframe?.contentWindow?.postMessage({ type: "javascript", value }, "*");
    }
  }, [value]);

  return (
    <iframe
      className="h-screen w-full"
      sandbox="allow-scripts"
      ref={iframeEl}
      srcDoc={`<html>
              <head>
              <script type="module">
                window.addEventListener('message', (event) => {
                  const { type, value } = event.data;

                  if (type === 'html') {
                    document.body.innerHTML = value;
                  }
                })
              </script>
              </head>
              <body>
              </body>
            </html>`}
    />
  );
};

export default Iframe;
