"use client"; // Add this line to mark the component as a Client Component

import { useEffect, useState } from 'react';
import styles from './CircleFollowMouse.module.css'; // Import the CSS module

const CircleFollowMouse = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className={styles.circle}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
    </>
  );
};

export default CircleFollowMouse;