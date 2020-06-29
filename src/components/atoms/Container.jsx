import React from 'react';

export const Container = (props) => {
  return (
    <div
      {...props}
      style={{
        maxWidth: '60em',
        margin: '0 auto',
        padding: '1em 1em 0',
      }}
    />
  );
};
