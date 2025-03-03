import React from "react";

const Placard = ({ imageUrl, altText }) => {
  return (
    <div className="mx-52 overflow-hidden h-72 rounded-2xl"> {/* Adjust height as needed */}
      <img
      src={"https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/08/06/30148_BB_D_BackToSchool_08_06_24.jpg"}

        alt={altText}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Placard;
