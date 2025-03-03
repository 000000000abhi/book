import React from "react";

const Placardtwo = ({ imageUrl, altText }) => {
  return (
    <div className="mx-52 overflow-hidden h-64 rounded-2xl"> {/* Adjust height as needed */}
      <img
      src={"https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2024/09/03/30295_Membership_Gateway_Billboard_C_09_03_24.jpg"}

        alt={altText}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Placardtwo;
