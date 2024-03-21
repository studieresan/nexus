import React from 'react';

interface WaveDividerProps {
  direction?: 'up' | 'down';
  fillColor?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ direction, fillColor = '#F5E7E0' }) => {
  if (direction === 'down') {
    return (
      <div className='bg-dark pt-5 d-none d-md-block'>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill={fillColor}
            d="M 0 0 L 0 101 H 1440 Z" 
            />
        </svg>
      </div>
    );
  } else {
    return (
      <div className='bg-dark d-none d-md-block'>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill={fillColor}
            d="M 0 0 H 1440 L 0 101 Z" 
            />
        </svg>
      </div>
    );
  }
};

export default WaveDivider;