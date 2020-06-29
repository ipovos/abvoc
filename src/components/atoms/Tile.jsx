import React from 'react';

import { colors } from '../../shared/styles';

export const Tile = ({ noPadding, ...restProps }) => {
  return (
    <article
      {...restProps}
      style={{
        border: `1px solid ${colors.violet}`,
        padding: noPadding ? 0 : '1.3em',
        borderRadius: '1.3em',
        marginBottom: '1em',
      }}
    />
  );
};
