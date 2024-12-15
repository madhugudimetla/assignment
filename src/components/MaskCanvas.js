import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

const MaskCanvas = (props) => {
  const {image, brushRadius, onExport}=props
  const canvasRef = useRef();

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const imageCanvas = canvas.getDataURL("image/png");
      onExport(imageCanvas);
    }
  };

  return (
    <div>
      {image && (
        <>
          <CanvasDraw
            ref={canvasRef}
            imgSrc={image}
            canvasWidth={1000}
            canvasHeight={1000}
            brushRadius={brushRadius}
            hideGrid
          />
          <button onClick={handleExport}>Export Mask</button>
        </>
      )}
    </div>
  );
};

export default MaskCanvas;
