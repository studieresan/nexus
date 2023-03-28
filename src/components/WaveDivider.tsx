import React from 'react';

interface WaveDividerProps {
  fillColor?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ fillColor = 'white' }) => {
  return (
    <div className='bg-dark'>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          fill={fillColor}
          d="M0,0 C720,100 720,0 1440,0 L1440,100 L0,100 Z"
          />
      </svg>
    </div>
  );
};

export default WaveDivider;