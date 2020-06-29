import React from 'react';

export const Input = ({ type = 'text', ...restProps }) => {
  return (
    <input
      type={type}
      {...restProps}
      style={{
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '1em',
        lineHeight: 2,
        border: 'none',
        borderBottom: '1px solid #8367C7',
      }}
    />
  );
};
