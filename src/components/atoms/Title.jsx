import React from 'react';

export const Title = ({ children, ...restProps }) => {
  return (
    <h1
      {...restProps}
      style={{
        margin: '0',
        fontSize: '1em',
        lineHeight: 1.5,
      }}
    >
      {children}
    </h1>
  );
};
