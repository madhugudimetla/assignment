import React, { useState } from "react";
import './ImageUploader.css'
const ImageUploader=(props) => {
  const {onImageUpload}=props
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageUpload(url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {preview && <img src={preview} alt="Preview" className="PreviewImg" />}
    </div>
  );
};

export default ImageUploader;
