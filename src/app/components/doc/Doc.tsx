import React from "react";

const Doc = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const bin2String = (array) => {
    return String.fromCharCode.apply(String, array);
  }


  // const src = source;

  const bytes = [102, 111, 111];
  const blob = bin2String(bytes);
  const blobContent = new Blob([blob], { type: "text/html" });
  const src = URL.createObjectURL(blobContent);

  return (
    <div>
      <iframe id="loc-container"
        frameBorder="0"
        scrolling="no"
        src={src}
        // src={"https://docs.google.com/viewer?url=" + src + "&embedded=true"}
        title="file"
        width="100%"
        height="600"
      ></iframe>
    </div>
  );
};

export default Doc;
