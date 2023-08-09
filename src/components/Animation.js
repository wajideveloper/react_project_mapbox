import React, { useState, useEffect } from 'react';

const Animation = ({setMapColor}) => {
    const [loading, setLoading] = useState(false); 
    // New state for controlling the animation

    const handleAnimation = () => {
        setLoading(!loading);
      };
    
      // useEffect to control the animation
      useEffect(() => {
        let animationInterval;
        if (loading) {
          animationInterval = setInterval(() => {
            // Randomize the map color
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            setMapColor(randomColor);
          }, 1000); // Change the color every 1 second (adjust the interval as desired)
        } else {
          clearInterval(animationInterval);
          setMapColor('green'); // Reset the map color when animation stops
        }
    
        return () => {
          clearInterval(animationInterval);
        };
      }, [loading]);
  return (
    <div>
        {/* Button to trigger the animation */}
      <button onClick={handleAnimation} style={{ margin: '20px' }}>
        {loading ? 'Stop Animation' : 'Start Animation'}
      </button>
    </div>
  )
}

export default Animation;
