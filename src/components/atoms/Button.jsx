import React from 'react';

import { colors } from '../../shared/styles';

export const Button = ({
  wide = false,
  type = 'button',
  look,
  ...restProps
}) => {
  const mainStyle = {
    display: 'block',
    width: wide ? '100%' : 'initial',
    fontSize: '1em',
    borderRadius: '1.3em',
    border: `1px solid ${colors.violet}`,
    color: colors.purple,
    padding: '0.65em 1.3em',
    backgroundColor: colors.violetLight,
    cursor: 'pointer',
  };

  const purpleStyle = {
    padding: '1em',
    fontWeight: 700,
    background: `linear-gradient(30deg, ${colors.purple} 30%, ${colors.violet} 100%)`,
    color: '#fff',
    fontStyle: 'italic',
  };
  return (
    <button
      {...restProps}
      style={{
        ...mainStyle,
        ...(look === 'purple' ? purpleStyle : {}),
      }}
    />
  );
};
