import React, { useRef, useEffect, useState } from "react";
import worldMap from "../../assets/world_map.png";

const WorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentInstrument, setCurrentInstrument] = useState<string>("pencil");
  const [currentColor, setCurrentColor] = useState<string>("#000000");

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

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentInstrument(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      redrawImage();
    }
  };

  const redrawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const image = new Image();
    image.src = worldMap;
    image.onload = () => {
      if (canvas) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    };
  };

  useEffect(() => {
    redrawImage();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = currentColor;
    switch (currentInstrument) {
      case "pencil":
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        break;
      case "brush":
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        break;
      case "eraser":
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#FFFFFF"; // Eraser color set to white
        break;
      default:
        break;
    }
  }, [currentColor, currentInstrument]);

  return (
    <div>
      <div>
        <label htmlFor="instrument">Instrument:</label>
        <select
          id="instrument"
          value={currentInstrument}
          onChange={handleInstrumentChange}
        >
          <option value="pencil">Pencil</option>
          <option value="brush">Brush</option>
          <option value="eraser">Eraser</option>
        </select>
        <label htmlFor="color">Color:</label>
        <input
          type="color"
          id="color"
          value={currentColor}
          onChange={handleColorChange}
        />
        <button onClick={clearCanvas}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default WorldMap;
