import React from "react";
import './ExportedImages.css'
const ExportedImages = (props) => {
  const {original, mask}=props
  return (
    <div className="container">
      {original && <img className="maskImg" src={original} alt="Original"/>}
      {mask && <img src={mask} alt="Mask" className="maskImg" />}
    </div>
  );
};

export default ExportedImages;
