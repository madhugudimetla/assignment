import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "./App.css";

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleExportMask = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.canvas.drawing;
      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;
      const maskContext = maskCanvas.getContext("2d");
      maskContext.fillStyle = "black";
      maskContext.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskContext.drawImage(canvas, 0, 0);

      setMaskImage(maskCanvas.toDataURL("image/png"));
    }
  };

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">Image Inpainting Widget</h1>
      <div className="upload-container">
        <input type="file" onChange={handleImageUpload} />
      </div>
      {uploadedImage && (
        <div className="canvas-container">
          <div className="image-container">
            <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
          </div>
          <CanvasDraw
            ref={canvasRef}
            brushColor="yellow"
            brushRadius={5}
            canvasWidth={280}
            canvasHeight={280}
            imgSrc={uploadedImage}
            className="drawing-canvas"
          />
        </div>
      )}
      <div className="controls">
        <button onClick={handleExportMask}>Export Mask</button>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
      </div>
      {maskImage && (
        <div className="output-container">
          <div className="original">
            <h3>Original Image</h3>
            <img src={uploadedImage} alt="Original" />
          </div>
          <div className="mask">
            <h3 >Mask Image</h3>
            <img src={maskImage} alt="Mask" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

