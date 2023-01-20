import React, { useState, CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000000");

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  

  return (
    <div>
      <div className="sweet-loading">
        <DotLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={200}
        />
      </div>
    </div>
  );
}

export default Loader;
