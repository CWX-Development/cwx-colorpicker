// src/components/ColorPicker.js

import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = () => {
  const [color, setColor] = useState('#ff0000');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvasRef.current.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'cyan');
    gradient.addColorStop(5 / 6, 'blue');
    gradient.addColorStop(1, 'magenta');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const handleHueChange = (e) => {
    const newHue = (e.nativeEvent.offsetX / canvasRef.current.width) * 360;
    setHue(newHue);
    setColor(`hsl(${newHue}, ${saturation}%, ${lightness}%)`);
  };

  const handleSaturationChange = (e) => {
    const newSaturation = e.target.value;
    setSaturation(newSaturation);
    setColor(`hsl(${hue}, ${newSaturation}%, ${lightness}%)`);
  };

  const handleLightnessChange = (e) => {
    const newLightness = e.target.value;
    setLightness(newLightness);
    setColor(`hsl(${hue}, ${saturation}%, ${newLightness}%)`);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={50}
        onClick={handleHueChange}
      />
      <div>
        <label>
          Saturation:
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={handleSaturationChange}
          />
        </label>
      </div>
      <div>
        <label>
          Lightness:
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={handleLightnessChange}
          />
        </label>
      </div>
      <div
        style={{ marginTop: '20px', padding: '10px', backgroundColor: color }}
      >
        Selected Color: {color}
      </div>
    </div>
  );
};

export default ColorPicker;

