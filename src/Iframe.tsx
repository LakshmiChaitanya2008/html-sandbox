import React from "react";

interface IframeProps {
  files: {
    [key: string]: {
      name: string;
      value: string;
      language: string;
    };
  };
}
export const Iframe = ({ files }: IframeProps) => {
  return (
    <div>
      <iframe
        className="h-screen w-full"
        sandbox="allow-scripts"
        srcDoc={` 
          <html>
            <head>
              <style>
                ${files["style.css"].value}
              </style>
             </head>
            <body>
              ${files["index.html"].value}
            </body>
              <script>
                ${files["script.js"].value}
              </script>
          </html>`}
      />
    </div>
  );
};
