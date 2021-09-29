interface IframeProps {
  files: {
    [key: string]: {
      name: string;
      value: string;
      language: string;
    };
  };
}

const Iframe = ({ files }: IframeProps) => {
  return <div></div>;
};

export default Iframe;
