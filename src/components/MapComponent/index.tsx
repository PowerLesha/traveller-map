import React, { useRef, useEffect, useState } from "react";
import worldMap from "../../assets/world_map.png";
const WorldMap: React.FC = () => {
  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // State to track drawing status
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Function to handle mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Function to handle mouse move event
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    // Load the world image
    const image = new Image();
    image.src = worldMap;
    // Draw the image onto the canvas when it's loaded
    if (canvas) {
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800} // Adjust the width based on your image dimensions
        height={600} // Adjust the height based on your image dimensions
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default WorldMap;
