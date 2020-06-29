import React from 'react';

export const Tile = ({ noPadding, ...restProps }) => {
  return (
    <article
      {...restProps}
      style={{
        border: '1px solid #8367C7',
        padding: noPadding ? 0 : '1.3em',
        borderRadius: '1.3em',
        marginBottom: '1em',
      }}
    />
  );
};
