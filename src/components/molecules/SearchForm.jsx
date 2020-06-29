import React from 'react';

import { Input } from '../atoms/Input';

export const SearchForm = ({
  caption,
  validationError,
  ...otherProps
}) => {
  return (
    <>
      <div>
        <i>{caption}</i>
      </div>
      <br />
      <Input
        type="text"
        placeholder="type here..."
        {...otherProps}
      />
      <br />
      {validationError?.length > 0 ? (
        <div style={{ color: '#FD151B' }}>
          <i>{validationError}</i>
        </div>
      ) : (
        <br />
      )}
    </>
  );
};
