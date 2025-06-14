import React from 'react';

const AnimatedBackground = () => {
  const barCount = 10;
  const animationDelays = React.useMemo(() => 
    Array.from({ length: barCount }, () => `${(Math.random() * -2).toFixed(2)}s`)
  , [barCount]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
      <div className="relative w-full h-full flex justify-around items-end">
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            className="animated-bar bg-primary rounded-t-sm"
            style={{
              width: '5%',
              animationDelay: animationDelays[index],
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
