import React from 'react';

const Logo = () => {
  const logoText = "8-CHEMS";

  // Function to generate a random color
  const getRandomColor = () => {
    // Generate random values within cold color ranges
    const red = Math.floor(Math.random() * 128); // Low red values
    const green = Math.floor(Math.random() * 256); // Full range for green
    const blue = Math.floor(128 + Math.random() * 128); // High blue values

    // Convert to hexadecimal format
    const toHex = (value) => value.toString(16).padStart(2, '0');

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  };


  // Function to generate random height between 30px and 150px
  const getRandomHeight = () => {
    return Math.floor(Math.random() * (30 - 6 + 1)) + 6; // Random height between 30px and 150px
  };

  return (
    <div className="logo-container">
      {logoText.split("").map((char, index) => (
        <div key={index} className="bar-container">
          <div
            className="bar"
            style={{
              height: `${getRandomHeight()}px`,
              backgroundColor: getRandomColor(),
            }}
          />
          <span className="logo-letter">{char}</span>
        </div>
      ))}
    </div>
  );
};

export default Logo;
