import React from 'react';

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
    border: '1px solid #8367C7',
    padding: '0.65em 1.3em',
    backgroundColor: 'hsl(269, 97%, 90%)',
  };

  const purpleStyle = {
    padding: '1em',
    fontWeight: 700,
    background:
      'linear-gradient(30deg, rgba(86,3,173,1) 28%, rgba(131,103,199,1) 100%)',
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
