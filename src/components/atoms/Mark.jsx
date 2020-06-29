import React from 'react';

import { colors } from '../../shared/styles';

export const Mark = (props) => {
  return (
    <mark
      {...props}
      style={{ backgroundColor: colors.mustard }}
    />
  );
};
