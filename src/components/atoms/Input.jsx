import React from 'react';

import { colors } from '../../shared/styles';

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
        borderBottom: `1px solid ${colors.violet}`,
      }}
    />
  );
};
