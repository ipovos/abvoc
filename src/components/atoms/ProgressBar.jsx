import React from 'react';

export const ProgressBar = ({ percent }) => {
  return (
    <div
      style={{
        height: '2px',
        backgroundColor: 'hsl(269, 97%, 90%)',
      }}
    >
      <div
        style={{
          height: '2px',
          backgroundColor:
            percent === 100 ? '#138A36' : '#5603AD',
          width: `${Math.min(percent, 100)}%`,
        }}
      />
    </div>
  );
};
