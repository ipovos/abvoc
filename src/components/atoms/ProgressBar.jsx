import React from 'react';

import { colors } from '../../shared/styles';

const getBackgroundColor = (percent, colored) => {
  if (!colored) {
    return colors.purpleLight;
  }

  if (percent < 33) {
    return colors.redLight;
  }

  if (percent < 66) {
    return colors.mustardLight;
  }

  return colors.greenLight;
};

const getProgressColor = (percent, colored) => {
  if (!colored) {
    return colors.purple;
  }

  if (percent < 33) {
    return colors.red;
  }

  if (percent < 66) {
    return colors.mustard;
  }

  return colors.green;
};

export const ProgressBar = ({
  percent,
  height = '2px',
  colored = false,
}) => {
  return (
    <div
      style={{
        height,
        backgroundColor: getBackgroundColor(
          percent,
          colored,
        ),
      }}
    >
      <div
        style={{
          height,
          backgroundColor: getProgressColor(
            percent,
            colored,
          ),
          width: `${Math.min(percent, 100)}%`,
          transition: 'width .1s ease-in-out'
        }}
      />
    </div>
  );
};
