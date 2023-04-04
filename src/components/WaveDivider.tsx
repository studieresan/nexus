import React from 'react';

interface WaveDividerProps {
  direction?: 'up' | 'down';
  fillColor?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ direction, fillColor = 'white' }) => {
  if (direction === 'down') {
    return (
      <div className='bg-dark pt-3 d-none d-md-block'>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path
            fill={fillColor}
            d="M0,0 C720,170 720,0 1440,0 L1440,100 L0,100 Z"
            />
        </svg>
      </div>
    );
  } else {
    return (
      <div className='bg-dark d-none d-md-block'>
        <svg viewBox="0 0 1440 99" preserveAspectRatio="none">
          <path
            fill={fillColor}
            d="M0,100 C720,-100 720,100 1440,100 L1440,0 L0,0 Z"
            />
        </svg>
      </div>
    );
  }
};

export default WaveDivider;